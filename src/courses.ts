import { Page } from 'playwright';

export async function getCourseUrls(page: Page): Promise<string[]> {
    await page.goto('https://vueschool.io/courses');

    const courseLinks = await page.$$eval('a[href*="/courses/"]', (links) => [
        ...new Set(links.map((link) => (link as HTMLAnchorElement).href)),
    ]);

    return courseLinks;
}
