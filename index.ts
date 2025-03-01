import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://vueschool.io");

  console.log("Title:", await page.title());

  await browser.close();
}

run().catch(console.error);
