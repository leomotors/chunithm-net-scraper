import { chromium } from "playwright";
import postgres from "postgres";

import { environment } from "./environment.js";
import { login } from "./steps/1-login.js";
import { playerData } from "./steps/2-playerdata.js";

const sql = postgres(environment.DATABASE_URL);

const jobId = (
  await sql`INSERT INTO job (timestamp) VALUES (NOW()) RETURNING id`
)[0].id as number;

const browser = await chromium.launch({
  headless: !process.env.DEBUG,
});

const page = await browser.newPage();

await login(page);
await page.getByRole("link", { name: "PLAYER DATA" }).click();
await page.waitForURL("https://chunithm-net-eng.com/mobile/home/playerData");

await playerData(page, sql, jobId);

await page.getByRole("link", { name: "MUSIC FOR RATING" }).click();
await page.waitForURL(
  "https://chunithm-net-eng.com/mobile/home/playerData/ratingDetailBest/",
);

await page.getByRole("link", { name: "Recent" }).click();
await page.getByRole("link", { name: "Selection" }).click();

await sql.end();
await browser.close();
