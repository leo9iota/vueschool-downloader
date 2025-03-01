// ./src/auth.ts
import { Page } from 'playwright';
import { promises as fs } from 'fs'; // ✅ Use async-friendly `fs.promises`

/**
 * Logs into VueSchool using provided credentials.
 * @param page The Playwright Page object
 */
export async function login(page: Page): Promise<void> {
    console.log("🔑 Logging into VueSchool...");

    // Navigate to the login page
    await page.goto('https://vueschool.io/login');

    // Fill in the credentials
    await page.fill('input[name="email"]', 'your-email@example.com');
    await page.fill('input[name="password"]', 'your-secure-password');

    // Click login and wait for URL change
    await page.click('button[type="submit"]');
    await page.waitForURL('https://vueschool.io/courses', { timeout: 15000 });

    // Save cookies for future sessions (ASYNC)
    const cookies = await page.context().cookies();
    await fs.writeFile('./cookies.json', JSON.stringify(cookies));

    console.log("✅ Successfully logged in!");
}

/**
 * Loads saved cookies from a previous login session.
 * @param page The Playwright Page object
 */
export async function loadCookies(page: Page): Promise<void> {
    try {
        const cookieFileExists = await fs.stat('./cookies.json').then(() => true).catch(() => false);
        if (cookieFileExists) {
            const cookies = JSON.parse(await fs.readFile('./cookies.json', 'utf8'));
            await page.context().addCookies(cookies);
            console.log("🍪 Loaded saved cookies.");
        }
    } catch (error) {
        console.error("❌ Failed to load cookies:", error);
    }
}
