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
    videoUrl?: string | null;
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

    const chapters: ChapterData[] = await page.$$eval('.chapter', (chapterElements) => {
        return chapterElements.map((chapter) => {
            const chapterTitle = chapter.querySelector('h2')?.textContent?.trim() || null;

            const lessons: LessonData[] = Array.from(chapter.querySelectorAll('.title')).map(
                (lesson) => ({
                    title: lesson.textContent?.trim() || null,
                    url: (lesson.closest('a') as HTMLAnchorElement)?.href || '',
                    videoUrl: null, // Placeholder, will be updated later
                })
            );

            return {
                title: chapterTitle,
                lessons,
            };
        });
    });

    // Process each lesson to get the Vimeo video URL
    for (const chapter of chapters) {
        for (const lesson of chapter.lessons) {
            lesson.videoUrl = await processLessonData(page, lesson.url);
        }
    }

    return {
        url,
        title,
        chapters,
    };
}

/**
 * Extracts the Vimeo video URL from a lesson page.
 * @param page The Playwright Page object to use
 * @param lessonUrl The lesson URL to navigate to
 * @returns Promise that resolves to the Vimeo video URL or null
 */
export async function processLessonData(page: Page, lessonUrl: string): Promise<string | null> {
    await navigateToPage(page, lessonUrl);
    console.log(`Processing lesson: ${lessonUrl}`);

    try {
        // Wait for the iframe to load (max 10 seconds)
        const iframeElement = await page.waitForSelector('iframe[src*="player.vimeo.com/video/"]', {
            timeout: 10000,
        });

        if (!iframeElement) {
            console.error(`❌ No iframe found for lesson: ${lessonUrl}`);
            return null;
        }

        // Extract the Vimeo URL
        const rawVideoUrl = await iframeElement.getAttribute('src');

        if (!rawVideoUrl) {
            console.error(`❌ Failed to extract video URL from iframe for: ${lessonUrl}`);
            return null;
        }

        // Remove query parameters to get clean video URL
        const cleanVideoUrl = rawVideoUrl.split('?')[0];
        console.log(`🎥 Extracted video URL: ${cleanVideoUrl}`);

        return cleanVideoUrl;
    } catch (error) {
        console.error(`❌ Error extracting video URL for ${lessonUrl}:`, error);
        return null;
    }
}
