import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: !process.env.DEBUG,
});

const page = await browser.newPage();
await page.goto("https://example.com");
// other actions...

await browser.close();
