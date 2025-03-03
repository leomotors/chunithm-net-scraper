import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

import {
  clearMarkType,
  playResultRankType,
  ratingType,
  stdChartDifficultyType,
} from "./types";

export const job = pgTable("job", {
  id: serial().primaryKey().notNull(),
  timestamp: timestamp().defaultNow().notNull(),
});

export const playerData = pgTable("player_data", {
  id: serial().primaryKey().notNull(),
  jobId: integer("job_id")
    .notNull()
    .references(() => job.id, { onUpdate: "cascade", onDelete: "cascade" }),
  currentRating: numeric("current_rating").notNull(),
  maxRating: numeric("max_rating").notNull(),
  overpowerValue: numeric("overpower_value").notNull(),
  overpowerPercent: numeric("overpower_percent").notNull(),
  lastPlayed: timestamp("last_played").notNull(),
  currentCurrency: integer("current_currency").notNull(),
  totalCurrency: integer("total_currency").notNull(),
  playCount: integer("play_count").notNull(),
  rightHtmlRaw: text("right_html_raw").notNull(),
  bottomHtmlRaw: text("bottom_html_raw").notNull(),
  playerLevel: integer("player_level").default(1),
  playerName: text("player_name").default(""),
  teamName: text("team_name"),
  honorText: text("honor_text").default(""),
});

export const musicRatingHtml = pgTable("music_rating_html", {
  id: serial().primaryKey().notNull(),
  jobId: integer("job_id")
    .notNull()
    .references(() => job.id, { onUpdate: "cascade", onDelete: "cascade" }),
  bestHtml: text("best_html").notNull(),
  recentHtml: text("recent_html").notNull(),
  selectionHtml: text("selection_html").notNull(),
});

export const musicRating = pgTable(
  "music_rating",
  {
    id: serial().primaryKey().notNull(),
    jobId: integer("job_id")
      .notNull()
      .references(() => job.id, { onUpdate: "cascade", onDelete: "cascade" }),
    title: text().notNull(),
    score: integer().notNull(),
    difficulty: stdChartDifficultyType().notNull(),
    ratingType: ratingType("rating_type").notNull(),
    musicOrder: integer("music_order").notNull(),
    level: numeric().notNull(),
    rank: playResultRankType().notNull(),
    rating: numeric().notNull(),
  },
  (table) => [unique().on(table.jobId, table.ratingType, table.musicOrder)],
);

export const chartConstant = pgTable(
  "chart_constant",
  {
    title: text().notNull(),
    difficulty: stdChartDifficultyType().notNull(),
    version: text().notNull(),
    level: numeric({ precision: 3, scale: 1 }).notNull(),
  },
  (table) => [unique().on(table.title, table.difficulty, table.version)],
);

export const chartScore = pgTable(
  "chart_score",
  {
    jobId: integer("job_id")
      .notNull()
      .references(() => job.id, { onUpdate: "cascade", onDelete: "cascade" }),
    title: text().notNull(),
    difficulty: stdChartDifficultyType().notNull(),
    score: integer().notNull(),
    fc: boolean().notNull(),
    aj: boolean().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    clearMark: clearMarkType("clear_mark").default("NONE").notNull(),
    fullChain: numeric("full_chain", { precision: 1, scale: 0 })
      .default("0")
      .notNull(),
  },
  (table) => [
    unique().on(
      table.title,
      table.difficulty,
      table.score,
      table.fc,
      table.aj,
      table.clearMark,
      table.fullChain,
    ),
  ],
);

export const qmanRawTable = pgTable("qman_raw", {
  id: serial().primaryKey().notNull(),
  jobId: integer("job_id")
    .notNull()
    .references(() => job.id, { onUpdate: "cascade", onDelete: "cascade" }),
  raw: text().notNull().default(""),
});
