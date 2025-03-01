// index.ts
import { Browser } from 'playwright';
import { launchBrowser } from './src/browser';
import { createNewPage } from './src/scraper';
import { CourseData, getCourseUrls, processCourseData } from './src/courses';
import { saveToFile } from './src/utils';
import { login, loadCookies } from './src/auth';

/**
 * Main application function that:
 * 1. Launches a browser
 * 2. Extracts course URLs from VueSchool
 * 3. Processes each course to get detailed information
 * 4. Saves the extracted data to JSON files
 */
(async (): Promise<void> => {
    const browser: Browser = await launchBrowser();
    const page = await createNewPage(browser);

    try {
        await loadCookies(page); // Try to reuse cookies
        await login(page); // Log in if necessary

        const courseUrls: string[] = await getCourseUrls(page);
        console.log('Extracted Course URLs:', courseUrls);

        await saveToFile('./output/courses.json', courseUrls);

        const courseData: CourseData[] = [];
        for (const url of courseUrls) {
            try {
                const data = await processCourseData(page, url);
                courseData.push(data);
                console.log(`✅ Processed: ${url} (${data.chapters.length} chapters)`);
            } catch (error) {
                console.error(`❌ Failed to process: ${url}`, error);
            }
        }

        await saveToFile('./output/course-details.json', courseData);
    } catch (error: unknown) {
        console.error('❌ Error scraping courses:', error);
    } finally {
        await browser.close();
    }
})();
