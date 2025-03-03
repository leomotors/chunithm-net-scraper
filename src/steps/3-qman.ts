/// <reference types="bun-types" />

import { Page } from "playwright";

import {
  calculateRank,
  calculateRating,
  getInternalLevel,
} from "../data/findRating.js";
import {
  chartScore,
  musicRating,
  qmanRawTable,
  RatingType,
} from "../db/schema/index.js";
import { environment } from "../environment.js";
import { dbType } from "../playwright.js";

import { main } from "./vendor/qman.js";
import { QmanData, QmanScore, toStdDifficulty } from "./vendor/types.js";

async function uploadMusic(
  jobId: number,
  db: dbType,
  scores: QmanScore[],
  ratingType: RatingType,
) {
  const payload = [] as (typeof musicRating.$inferInsert)[];

  for (const [index, score] of scores.entries()) {
    const level = await getInternalLevel(
      score.title,
      toStdDifficulty(score.difficulty),
      db,
      environment.VERSION,
    );

    payload.push({
      jobId: jobId,
      title: score.title,
      score: score.score,
      difficulty: toStdDifficulty(score.difficulty),
      ratingType: ratingType,
      musicOrder: index + 1,
      level: level.toString(),
      rank: calculateRank(score.score),
      rating: calculateRating(score.score, level).toFixed(2),
    });
  }

  await db.insert(musicRating).values(payload);
}

export async function qman(
  jobId: number,
  page: Page,
  db: dbType,
  lastPlayed: Date,
) {
  const result = (await page.evaluate(main)) as QmanData;

  await uploadMusic(jobId, db, result.best, "best");
  await uploadMusic(jobId, db, result.recent, "recent");
  await uploadMusic(jobId, db, result.candidate, "selection");

  for (const score of result.score) {
    await db
      .insert(chartScore)
      // @ts-expect-error insert on table with default column
      .values({
        jobId: jobId,
        title: score.title,
        difficulty: toStdDifficulty(score.difficulty),
        score: score.score,
        fc: score.isFullCombo,
        aj: score.isAllJustice,
        clearMark: score.clearMark,
        fullChain: score.fullChain,
        updatedAt: lastPlayed.toISOString(),
      })
      .onConflictDoNothing();
  }

  const resultStr = JSON.stringify(result);

  // @ts-expect-error insert on table with default column
  await db.insert(qmanRawTable).values({
    jobId: jobId,
    raw: resultStr,
  });

  return resultStr;
}
