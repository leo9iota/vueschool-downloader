import { Browser, chromium } from 'playwright';

export async function launchBrowser(): Promise<Browser> {
    return await chromium.launch({ headless: true });
}
