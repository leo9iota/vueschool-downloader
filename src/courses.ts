// ./src/courses.ts
import { Page } from 'playwright';
import { navigateToPage } from './scraper';

export interface CourseData {
    url: string;
    title: string | null;
    chapters: ChapterData[];
}

export interface ChapterData {
    title: string | null;
    lessons: LessonData[];
}

export interface LessonData {
    title: string | null;
    url: string;
}

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
export async function processCourseData(page: Page, url: string): Promise<CourseData> {
    await navigateToPage(page, url);
    console.log(`Processing course: ${url}`);

    const title = await page.$eval('h1', (el) => el.textContent);

    // Extract all chapters
    const chapters: ChapterData[] = await page.$$eval('.chapter', (chapterElements) => {
        return chapterElements.map((chapter) => {
            const chapterTitle = chapter.querySelector('h2')?.textContent?.trim() || null;

            // Extract lessons (only title and URL)
            const lessons: LessonData[] = Array.from(chapter.querySelectorAll('.title')).map(
                (lesson) => ({
                    title: lesson.textContent?.trim() || null,
                    url: (lesson.closest('a') as HTMLAnchorElement)?.href || '',
                })
            );

            return {
                title: chapterTitle,
                lessons,
            };
        });
    });

    return {
        url,
        title,
        chapters,
    };
}
