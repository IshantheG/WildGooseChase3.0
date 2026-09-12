from playwright.async_api import Page, TimeoutError as PlaywrightTimeoutError
import time

from scraper.css_selectors import JOB_CARD_SELECTOR, MODAL_SELECTOR, DETAIL_PANEL_SELECTOR, FIELD_ROW_SELECTOR, HEADER_TITLE_SELECTOR, TARGET_FIELDS, JOB_CARD_ID_CHECKBOX_SELECTOR


async def find_job_cards(page: Page):
   
    cards = page.locator(JOB_CARD_SELECTOR)
    try:
        await cards.first.wait_for(state="attached", timeout=15000)
    except PlaywrightTimeoutError:
        print("\n!! No job cards found matching selector "
              f"'{JOB_CARD_SELECTOR}'.")
        print("   Debugging info:")
        print(f"   - Page URL: {page.url}")
        print(f"   - Page title: {await page.title()}")
        body_snippet = await page.locator("body").inner_text()
        print(f"   - First 500 chars of visible body text:\n{body_snippet[:500]!r}")
        raise RuntimeError(
            "No job cards found. The selector may be stale, or the page "
            "may not have finished loading results. See debug info above."
        )
    return cards


async def open_job(page: Page, card) -> dict:
    title_link = card.locator(
        "td a[href='javascript:void(0)']"
    ).first

    await title_link.click()

    modal = page.locator(MODAL_SELECTOR).first
    await modal.wait_for(state="visible", timeout=15000)

    panel = modal.locator(DETAIL_PANEL_SELECTOR).first
    await panel.wait_for(state="visible", timeout=15000)

    await panel.locator(FIELD_ROW_SELECTOR).first.wait_for(
        state="attached",
        timeout=15000
    )

    header_fields = await scrape_header_fields(page)
    scraped = await scrape_job_fields(page)

    return build_report(scraped, header_fields)

async def scrape_header_fields(page: Page) -> dict:
    
    header = page.locator(MODAL_SELECTOR).first.locator(HEADER_TITLE_SELECTOR).first
    result = {"Job ID": "N/A", "Job Title": "N/A"}

    if await header.count() == 0:
        return result

    id_span = header.locator(".tag-label").first
    if await id_span.count() > 0:
        raw_id = (await id_span.inner_text()).strip()
      
        digits = "".join(ch for ch in raw_id if ch.isdigit())
        result["Job ID"] = digits if digits else "N/A"

    title_el = header.locator("h2").first
    if await title_el.count() > 0:
        title_text = (await title_el.inner_text()).strip()
        result["Job Title"] = title_text if title_text else "N/A"

    return result

async def get_first_job_id(page: Page) -> str:
    cards = page.locator(JOB_CARD_SELECTOR)

    checkbox = cards.first.locator(
        JOB_CARD_ID_CHECKBOX_SELECTOR
    )

    return await checkbox.get_attribute("value") or "N/A"


async def scrape_all_pages(page: Page) -> list[dict]:
    all_jobs = []
    seen_job_ids = set()
    page_number = 1

    while True:
        print("\n" + "=" * 60)
        print(f"SCRAPING PAGE {page_number}")
        print("=" * 60)

        jobs = await scrape_current_page(page)

        for job in jobs:
            job_id = job["Job ID"]

            if job_id == "N/A":
                print("  WARNING: Job has no ID, skipping deduplication.")
                all_jobs.append(job)
                continue

            if job_id in seen_job_ids:
                print(f"  Duplicate job {job_id}, skipping.")
                continue

            seen_job_ids.add(job_id)
            all_jobs.append(job)

        print(
            f"\nPage {page_number} complete."
            f" Total jobs: {len(all_jobs)}"
        )

        # Get the first job ID before navigating away.
        try:
            old_first_job_id = await get_first_job_id(page)
        except Exception:
            print("Could not determine first job ID.")
            break

        # Try to go to the next page.
        try:
            has_next = await go_to_next_page(
                page,
                old_first_job_id
            )
        except Exception as e:
            print(f"Could not navigate to next page: {e}")
            break

        if not has_next:
            print("\nReached the last page.")
            break

        page_number += 1

    return all_jobs


async def scrape_current_page(page: Page) -> list[dict]:
    jobs = []

    cards = page.locator(JOB_CARD_SELECTOR)
    count = await cards.count()

    print(f"Found {count} jobs on this page.")

    for i in range(count):
        print(f"\nScraping job {i + 1}/{count}...")

        card = cards.nth(i)

        try:
            job = await open_job(page, card)

            print(
                f"  {job['Job ID']} - "
                f"{job['Job Title']}"
            )

            jobs.append(job)
            await close_job_modal(page)

        except Exception as e:
            print(f"  ERROR: {e}")

            # Try to recover if the modal is still open.
            try:
                if await page.locator(MODAL_SELECTOR).count() > 0:
                    await close_job_modal(page)
            except Exception:
                pass

    time.sleep(10)

    return jobs
    

async def scrape_job_fields(page: Page) -> dict:
    
    modal = page.locator(MODAL_SELECTOR).first
    panel = modal.locator(DETAIL_PANEL_SELECTOR).first
    rows = panel.locator(FIELD_ROW_SELECTOR)
    row_count = await rows.count()

    scraped: dict[str, str] = {}
    for i in range(row_count):
        row = rows.nth(i)
        label_locator = row.locator(".label").first
        value_locator = row.locator("p").first

        if await label_locator.count() == 0:
            continue

        raw_label = (await label_locator.inner_text()).strip()
        label = raw_label.rstrip(":").strip()

        if await value_locator.count() > 0:
            value = (await value_locator.inner_text()).strip()
        else:
            value = ""

        if label:
            scraped[label] = value if value else "N/A"

    return scraped



LABEL_ALIASES = {
    "job-address line one": "Job - Address Line One",
    "job-city": "City",
    "job-province/state": "Province",
    "job-postal/zip code": "Postal Code",
    "job-country": "Country",
    "compensation and benefits": "Compensation",
}

async def close_job_modal(page: Page) -> None:
    close_button = page.get_by_role("button", name="Close")
    await close_button.click()

    await page.locator(MODAL_SELECTOR).wait_for(
        state="hidden",
        timeout=10000
    )

async def go_to_next_page(page: Page, old_first_job_id: str) -> bool:
    print("\nNavigating to next page...")
    next_button = page.locator(
    'a.pagination__link[aria-label="Go to next page"]'
)

    print(
    await page.locator(
        'a.pagination__link'
    ).all_inner_texts()
)

    print(
        await page.locator(
            'a.pagination__link'
        ).count()
    )

    print(
        await page.locator(
            'a[aria-label="Go to next page"]'
        ).count()
    )

    if await next_button.count() == 0:
        print("No next page button found.")
        return False

    classes = await next_button.get_attribute("class")
    print(classes)
    print("Checking if next button is disabled...")
    is_disabled = await next_button.evaluate(
    "(el) => el.classList.contains('disabled')"
)
    print(is_disabled)

    if classes and "disabled" in classes.split():
        return False

    await next_button.click()

    # Wait until the first job is different.
    await page.wait_for_function(
        """
        (oldId) => {
            const checkbox = document.querySelector(
                "tr.table__row--body th input[name='dataViewerSelection']"
            );

            return checkbox &&
                   checkbox.value &&
                   checkbox.value !== oldId;
        }
        """,
        arg=old_first_job_id,
        timeout=15000,
    )

    return True

def build_report(scraped: dict, header_fields: dict) -> dict:
   
    normalized: dict[str, str] = {}
    for raw_label, value in scraped.items():
        target_name = LABEL_ALIASES.get(raw_label.lower(), raw_label)
        if target_name:
            normalized[target_name.lower()] = value
        else:
            normalized[raw_label.lower()] = value

    report = {}
    for field in TARGET_FIELDS:
        if field in header_fields:
            report[field] = header_fields[field]
        else:
            report[field] = normalized.get(field.lower(), "N/A")
    return report




async def get_waterlooworks_page(context):
    for page in context.pages:
        if "waterlooworks.uwaterloo.ca" in page.url:
            return page

    raise RuntimeError(
        "No WaterlooWorks tab found. "
        "Open WaterlooWorks in the Chrome window."
    )

