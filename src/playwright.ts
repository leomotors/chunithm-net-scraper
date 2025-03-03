import { Page } from "playwright";

import { type db as dbValue } from "./db/index.js";
import { sendImage } from "./utils/discord.js";

export type dbType = typeof dbValue;

export type Step<T> = (jobId: number, page: Page, db: dbType) => Promise<T>;

export class PwPage {
  constructor(
    public readonly jobId: number,
    public readonly page: Page,
    public readonly db: dbType,
  ) {}

  async runStep<T>(stepName: string, step: Step<T>) {
    try {
      const stepStart = performance.now();
      const stepResult = await step(this.jobId, this.page, this.db);
      const stepEnd = performance.now();

      console.log(
        `${stepName} completed: Took ${Math.round(stepEnd - stepStart)}ms`,
      );

      return stepResult;
    } catch (e) {
      console.error(e);

      const screenshot = await this.page.screenshot();
      await sendImage(
        `ALERT :warning:: An error occured at step ${stepName}`,
        new Blob([screenshot]),
      );
    }
  }
}
