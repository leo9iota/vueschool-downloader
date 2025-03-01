import { Browser } from 'playwright';
import { launchBrowser } from './src/browser';
import { createNewPage } from './src/scraper';
import { getCourseUrls } from './src/courses';
import { saveToFile } from './src/utils';

(async (): Promise<void> => {
    const browser: Browser = await launchBrowser();
    const page = await createNewPage(browser);

    try {
        const courseUrls: string[] = await getCourseUrls(page);
        console.log('Extracted Course URLs:', courseUrls);

        // Save results to a JSON file
        await saveToFile('./output/courses.json', courseUrls);
    } catch (error: unknown) {
        console.error('❌ Error scraping courses:', error);
    } finally {
        await browser.close();
    }
})();
