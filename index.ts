// index.ts
import { Browser } from 'playwright';
import { launchBrowser } from './src/browser';
import { createNewPage, navigateToPage } from './src/scraper';
import { getCourseUrls, processCourseData } from './src/courses';
import { saveToFile } from './src/utils';

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
        const courseUrls: string[] = await getCourseUrls(page);
        console.log('Extracted Course URLs:', courseUrls);

        // Save course URLs to a JSON file
        await saveToFile('./output/courses.json', courseUrls);

        // Process each course
        const courseData: { url: string; title: string | null }[] = [];
        for (const url of courseUrls) {
            try {
                const data = await processCourseData(page, url);
                courseData.push(data);
                console.log(`✅ Processed: ${url}`);
            } catch (error) {
                console.error(`❌ Failed to process: ${url}`, error);
            }
        }

        // Save the processed course data
        await saveToFile('./output/course-details.json', courseData);
    } catch (error: unknown) {
        console.error('❌ Error scraping courses:', error);
    } finally {
        await browser.close();
    }
})();
