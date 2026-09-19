

import asyncio
import json
from playwright.async_api import async_playwright
from scraper.scraper import scrape_all_pages, get_waterlooworks_page

WATERLOOWORKS_URL = "https://waterlooworks.uwaterloo.ca/myAccount/co-op/full/jobs.htm"


def safe_print(value):
    text = str(value)
    try:
        print(text)
    except UnicodeEncodeError:
        print(text.encode("ascii", "backslashreplace").decode("ascii"))


async def main():

    async with async_playwright() as p:
        browser = await p.chromium.connect_over_cdp(
            "http://localhost:9222"
        )

        context = browser.contexts[0]

        page = await get_waterlooworks_page(context)
        safe_print(page.url)

        print("\nDEBUG")
        print("URL:", page.url)
        print("TITLE:", await page.title())

        print("Job rows:", await page.locator("tr.table__row--body").count())
        print("All TRs:", await page.locator("tr").count())

        body_text = await page.locator("body").inner_text()
        print("BODY:")
        

        jobs = await scrape_all_pages(page)

        print("\n" + "=" * 60)
        print(f"SCRAPING COMPLETE: {len(jobs)} JOBS")
        print("=" * 60)

       


if __name__ == "__main__":
    asyncio.run(main())