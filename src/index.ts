import { chromium } from "playwright";
import postgres from "postgres";

import { environment } from "./environment.js";
import { login } from "./steps/1-login.js";
import { playerData } from "./steps/2-playerdata.js";
import { music } from "./steps/3-music.js";

const sql = postgres(environment.DATABASE_URL);

const jobId = (
  await sql`INSERT INTO job (timestamp) VALUES (NOW()) RETURNING id`
)[0].id as number;

const browser = await chromium.launch({
  headless: !process.env.DEBUG,
});

const page = await browser.newPage();

// * Step 1: Login
await login(page);
await page.getByRole("link", { name: "PLAYER DATA" }).click();
await page.waitForURL("https://chunithm-net-eng.com/mobile/home/playerData");

// * Step 2: Player Data
await playerData(page, sql, jobId);

// * Step 3: Music for Rating
await music(page, sql, jobId);

await sql.end();
await browser.close();
