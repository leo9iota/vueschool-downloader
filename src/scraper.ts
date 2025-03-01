import { Page, Browser } from 'playwright';

export async function createNewPage(browser: Browser): Promise<Page> {
    return await browser.newPage();
}

export async function navigateToPage(page: Page, url: string): Promise<void> {
    await page.goto(url);
}
