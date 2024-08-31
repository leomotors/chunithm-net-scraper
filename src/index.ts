import { JSDOM } from "jsdom";
import { chromium } from "playwright";
import postgres from "postgres";

import { environment } from "./environment";
import {
  parseCurrentRating,
  parseLastPlayed,
  parseMaxRating,
  parseOverpower,
} from "./parser/playerData";
import { login } from "./steps/login";

const sql = postgres(environment.DATABASE_URL);

const jobId = (
  await sql`INSERT INTO job (timestamp) VALUES (NOW()) RETURNING id`
)[0].id as number;

const browser = await chromium.launch({
  headless: !process.env.DEBUG,
});

const page = await browser.newPage();

await login(page);

// #region Player Data
const playerData = page.locator(".player_data_right");
const playerDataHTML = await playerData.innerHTML();

const dataDom = new JSDOM(playerDataHTML);
const currentRating = parseCurrentRating(dataDom);
const maxRating = parseMaxRating(dataDom);
const overpower = parseOverpower(dataDom);
const lastPlayed = parseLastPlayed(dataDom);

await sql`INSERT INTO player_data (job_id, current_rating, max_rating, overpower_value, overpower_percent, last_played, data_html_raw)
VALUES (${jobId}, ${currentRating}, ${maxRating}, ${overpower.value}, ${overpower.percent}, ${lastPlayed}, ${playerDataHTML})`;
// #endregion Player Data

// await page.locator(".player_overpower").click();
// await page.locator(".player_lastplaydate").click();
// await page.getByRole("link", { name: "PLAYER DATA" }).click();
// await page.getByText("300").click();
// await page.getByRole("link", { name: "MUSIC FOR RATING" }).click();
// await page.getByText("Music for Rating(Best) 30").click();
// await page.getByRole("link", { name: "Recent" }).click();
// await page.getByRole("link", { name: "Selection" }).click();

await sql.end();
await browser.close();
