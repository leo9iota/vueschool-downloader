import { launchBrowser } from './src/browser';
import { createNewPage } from './src/scraper';
import { getCourseUrls } from './src/courses';
import { saveToFile } from './src/utils';

(async () => {
    const browser = await launchBrowser();
    const page = await createNewPage(browser);

    try {
        const courseUrls = await getCourseUrls(page);
        console.log('Extracted Course URLs:', courseUrls);

        // Save results to a JSON file
        await saveToFile('./output/courses.json', courseUrls);
    } catch (error) {
        console.error('❌ Error scraping courses:', error);
    } finally {
        await browser.close();
    }
})();
