// ./src/browser.ts
import { Browser, chromium } from 'playwright';

/**
 * Launches a headless Chromium browser instance using Playwright.
 * This browser instance is used for web scraping operations.
 * @returns Promise that resolves to a Browser instance
 */
export async function launchBrowser(): Promise<Browser> {
    return await chromium.launch({ headless: true });
}
