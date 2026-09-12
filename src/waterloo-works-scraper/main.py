

import asyncio
from playwright.async_api import async_playwright
from scraper.scraper import scrape_all_pages, get_waterlooworks_page

WATERLOOWORKS_URL = "https://waterlooworks.uwaterloo.ca/myAccount/co-op/full/jobs.htm"

async def main():

    async with async_playwright() as p:
        browser = await p.chromium.connect_over_cdp(
            "http://localhost:9222"
        )

        context = browser.contexts[0]

        page = await get_waterlooworks_page(context)       
        print(page.url)


        print("\nDEBUG")
        print("URL:", page.url)
        print("TITLE:", await page.title())

        print("Job rows:", await page.locator("tr.table__row--body").count())
        print("All TRs:", await page.locator("tr").count())

        body_text = await page.locator("body").inner_text()
        print("BODY:")
        print(body_text[:3000])

        jobs = await scrape_all_pages(page)

        print("\n" + "=" * 60)
        print(f"SCRAPING COMPLETE: {len(jobs)} JOBS")
        print("=" * 60)

        for job in jobs:
            print(
                job
            )
    

if __name__ == "__main__":
    asyncio.run(main())