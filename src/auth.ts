// ./src/auth.ts
import { Page } from 'playwright';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Logs into VueSchool using provided credentials.
 * @param page The Playwright Page object
 */
export async function login(page: Page): Promise<void> {
    console.log('🔑 Logging into VueSchool...');

    const email = process.env.EMAIL || '';
    const password = process.env.PASSWORD || '';

    if (!email || !password) {
        throw new Error(
            'Missing EMAIL or PASSWORD in environment variables. Check your .env file.'
        );
    }

    // Navigate to the login page
    await page.goto('https://vueschool.io/login', { waitUntil: 'domcontentloaded' });

    // ✅ Wait for email input field (New selector)
    await page.waitForSelector('input[type="email"]', { timeout: 15000 });

    // Fill in credentials
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);

    // Click the login button
    await page.click('button:has-text("Sign In")');

    // Wait for login success
    await page.waitForURL('https://vueschool.io/courses', { timeout: 20000 });

    // Save cookies for future sessions
    const cookies = await page.context().cookies();
    await fs.writeFile('./cookies.json', JSON.stringify(cookies));

    console.log('✅ Successfully logged in!');
}

/**
 * Loads saved cookies from a previous login session.
 * @param page The Playwright Page object
 */
export async function loadCookies(page: Page): Promise<void> {
    try {
        const cookieFileExists = await fs
            .stat('./cookies.json')
            .then(() => true)
            .catch(() => false);
        if (cookieFileExists) {
            const cookies = JSON.parse(await fs.readFile('./cookies.json', 'utf8'));
            await page.context().addCookies(cookies);
            console.log('🍪 Loaded saved cookies.');
        }
    } catch (error) {
        console.error('❌ Failed to load cookies:', error);
    }
}
