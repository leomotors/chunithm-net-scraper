import { JSDOM } from "jsdom";
import { Page } from "playwright";

import { playerData } from "../db/schema/tables.js";
import {
  parseCurrentCurrency,
  parseCurrentRating,
  parseHonorText,
  parseLastPlayed,
  parseMaxRating,
  parseOverpower,
  parsePlayCount,
  parsePlayerLevel,
  parsePlayerName,
  parseTeamName,
  parseTotalCurrency,
} from "../parser/playerData.js";
import { dbType } from "../playwright.js";

export async function scrapePlayerData(jobId: number, page: Page, db: dbType) {
  const rightData = page.locator(".player_data_right");
  const rightDataHTML = await rightData.innerHTML();
  const rightDataDom = new JSDOM(rightDataHTML);

  const bottomData = page.locator(".w420.box01");
  const bottomDataHTML = await bottomData.innerHTML();
  const bottomDataDom = new JSDOM(bottomDataHTML);

  const currentRating = parseCurrentRating(rightDataDom);
  const maxRating = parseMaxRating(rightDataDom);
  const overpower = parseOverpower(rightDataDom);
  const lastPlayed = parseLastPlayed(rightDataDom);
  const currentCurrency = parseCurrentCurrency(bottomDataDom);
  const totalCurrency = parseTotalCurrency(bottomDataDom);
  const playCount = parsePlayCount(bottomDataDom);

  const playerLevel = parsePlayerLevel(rightDataDom);
  const playerName = parsePlayerName(rightDataDom);
  const teamName = parseTeamName(rightDataDom);
  const honorText = parseHonorText(rightDataDom);

  await db.insert(playerData).values({
    // @ts-expect-error insert on table with default column
    jobId: jobId,
    currentRating: currentRating,
    maxRating: maxRating,
    overpowerValue: overpower.value,
    overpowerPercent: overpower.percent,
    lastPlayed: lastPlayed,
    currentCurrency: currentCurrency,
    totalCurrency: totalCurrency,
    playCount: playCount,
    rightHtmlRaw: rightDataHTML,
    bottomHtmlRaw: bottomDataHTML,
    playerLevel: playerLevel,
    playerName: playerName,
    teamName: teamName,
    honorText: honorText,
  });

  return lastPlayed;
}
