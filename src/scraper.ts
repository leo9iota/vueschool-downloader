// ./src/scraper.ts
import { Page, Browser } from 'playwright';

/**
 * Launches a headless Chromium browser instance using Playwright.
 * This browser instance is used for web scraping operations.
 * @returns Promise that resolves to a Browser instance
 */
export async function createNewPage(browser: Browser): Promise<Page> {
    return await browser.newPage();
}

/**
 * Navigates the browser page to the specified URL.
 * @param page The Playwright Page object to navigate
 * @param url The URL to navigate to
 */
export async function navigateToPage(page: Page, url: string): Promise<void> {
    await page.goto(url);
}
