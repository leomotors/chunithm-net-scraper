import { JSDOM } from "jsdom";
import { Page } from "playwright";
import { Sql } from "postgres";

import {
  calculateRank,
  calculateRating,
  getInternalLevel,
} from "../data/findRating.js";
import { parseMusic } from "../parser/music.js";
import { RatingType, StdChartDifficulty } from "../types.js";

const allDifficulties = [
  "basic",
  "advanced",
  "expert",
  "master",
  "ultima",
] satisfies StdChartDifficulty[];

async function scrapeMusic(
  sql: Sql,
  jobId: number,
  dom: JSDOM,
  ratingType: RatingType,
) {
  const musicBoxes = [
    ...dom.window.document.querySelectorAll("form > .musiclist_box"),
  ];

  const musicData = musicBoxes.map((musicBox, index) => {
    const parsed = parseMusic(musicBox);

    const level = getInternalLevel(
      parsed.musicTitle,
      allDifficulties[parsed.difficulty],
    );

    const rank = calculateRank(parsed.score);

    const rating = calculateRating(parsed.score, level);

    return {
      job_id: jobId,
      title: parsed.musicTitle,
      score: parsed.score,
      difficulty: allDifficulties[parsed.difficulty],
      rating_type: ratingType,
      music_order: index + 1,
      level,
      rank,
      rating,
    };
  });

  await sql`INSERT INTO music_rating ${sql(musicData, "job_id", "title", "score", "difficulty", "rating_type", "music_order", "level", "rank", "rating")}`;
}

export async function music(page: Page, sql: Sql, jobId: number) {
  await page.getByRole("link", { name: "MUSIC FOR RATING" }).click();
  await page.waitForURL(
    "https://chunithm-net-eng.com/mobile/home/playerData/ratingDetailBest/",
  );

  const best = await page.locator(".box05.w400").innerHTML();
  const bestDom = new JSDOM(best);

  await scrapeMusic(sql, jobId, bestDom, "best");

  await page.getByRole("link", { name: "Recent" }).click();
  await page.waitForURL(
    "https://chunithm-net-eng.com/mobile/home/playerData/ratingDetailRecent/",
  );

  const recent = await page.locator(".box05.w400").innerHTML();
  const recentDom = new JSDOM(recent);

  await scrapeMusic(sql, jobId, recentDom, "recent");

  await page.getByRole("link", { name: "Selection" }).click();
  await page.waitForURL(
    "https://chunithm-net-eng.com/mobile/home/playerData/ratingDetailNext/",
  );

  const selection = await page.locator(".box05.w400").innerHTML();
  const selectionDom = new JSDOM(selection);

  await scrapeMusic(sql, jobId, selectionDom, "selection");

  await sql`INSERT INTO music_rating_html (job_id, best_html, recent_html, selection_html) VALUES (${jobId}, ${best}, ${recent}, ${selection})`;
}
