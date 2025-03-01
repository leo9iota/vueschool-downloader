import { Page, Browser } from 'playwright';
import fs from 'fs';

/**
 * Logs into VueSchool using provided credentials.
 * @param page The Playwright Page object
 */
export async function login(page: Page): Promise<void> {
    console.log('🔑 Logging into VueSchool...');

    // Navigate to the login page
    await page.goto('https://vueschool.io/login');

    // Fill in the credentials
    await page.fill('input[name="email"]', 'your-email@example.com');
    await page.fill('input[name="password"]', 'your-secure-password');

    // Click the login button and wait for navigation
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    // Save cookies for future sessions
    const cookies = await page.context().cookies();
    fs.writeFileSync('./cookies.json', JSON.stringify(cookies));

    console.log('✅ Successfully logged in!');
}

/**
 * Loads saved cookies from a previous login session.
 * @param page The Playwright Page object
 */
export async function loadCookies(page: Page): Promise<void> {
    if (fs.existsSync('./cookies.json')) {
        const cookies = JSON.parse(fs.readFileSync('./cookies.json', 'utf8'));
        await page.context().addCookies(cookies);
        console.log('🍪 Loaded saved cookies.');
    }
}
