// ./src/courses.ts
import { Page } from 'playwright';
import { navigateToPage } from './scraper';

/**
 * Extracts course URLs from the VueSchool courses page.
 * @param page The Playwright Page object to use for extraction
 * @returns Promise that resolves to an array of course URL strings
 */
export async function getCourseUrls(page: Page): Promise<string[]> {
    await page.goto('https://vueschool.io/courses');

    const courseLinks = await page.$$eval('a[href*="/courses/"]', (links) => [
        ...new Set(links.map((link) => (link as HTMLAnchorElement).href)),
    ]);

    return courseLinks;
}

/**
 * Processes data for a specific course by navigating to its page and extracting information.
 * @param page The Playwright Page object to use
 * @param url The course URL to navigate to and process
 * @returns Promise that resolves to an object containing course data (url and title)
 */
export async function processCourseData(page: Page, url: string): Promise<any> {
    await navigateToPage(page, url);
    console.log(`Processing course: ${url}`);
    
    // Extract course data here
    // For example:
    const title = await page.$eval('h1', (el) => el.textContent);
    
    // Return the extracted data
    return {
        url,
        title,
        // Add more properties as needed
    };
}
