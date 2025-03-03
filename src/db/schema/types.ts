import { pgEnum } from "drizzle-orm/pg-core";

export const clearMarkValues = [
  "NONE",
  "CLEAR",
  "HARD",
  "ABSOLUTE",
  "ABSOLUTE+",
  "CATASTROPHY",
] as const;
export type ClearMark = (typeof clearMarkValues)[number];
export const clearMarkType = pgEnum("clear_mark", clearMarkValues);

export const playResultRankValues = [
  "D",
  "C",
  "B",
  "BB",
  "BBB",
  "A",
  "AA",
  "AAA",
  "S",
  "S+",
  "SS",
  "SS+",
  "SSS",
  "SSS+",
] as const;
export type PlayResultRank = (typeof playResultRankValues)[number];
export const playResultRankType = pgEnum(
  "play_result_rank",
  playResultRankValues,
);

export const ratingTypeValues = ["best", "recent", "selection"] as const;
export type RatingType = (typeof ratingTypeValues)[number];
export const ratingType = pgEnum("rating_type", ratingTypeValues);

export const stdChartDifficultyValues = [
  "basic",
  "advanced",
  "expert",
  "master",
  "ultima",
] as const;
export type StdChartDifficulty = (typeof stdChartDifficultyValues)[number];
export const stdChartDifficultyType = pgEnum(
  "std_chart_difficulty",
  stdChartDifficultyValues,
);
