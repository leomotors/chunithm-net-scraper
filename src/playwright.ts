import { Page } from "playwright";

import { type db as dbValue } from "./db/index.js";
import { sendImage } from "./utils/discord.js";

export type dbType = typeof dbValue;

export type Step<T> = (
  jobId: number,
  page: Page,
  db: dbType,
  retried: number,
) => Promise<T>;

export class PwPage {
  constructor(
    public readonly jobId: number,
    public readonly page: Page,
    public readonly db: dbType,
  ) {}

  async runStep<T>(stepName: string, step: Step<T>, retries = 1) {
    for (let i = 0; i < retries; i++) {
      try {
        return await this._runStep(stepName, step, i);
      } catch (e) {
        console.error(e);

        const screenshot = await this.page.screenshot();
        await sendImage(
          `ALERT :warning:: An error occured at step ${stepName} (Attempt ${i + 1}/${retries})`,
          new Blob([screenshot]),
        );
      }
    }
  }

  private async _runStep<T>(stepName: string, step: Step<T>, retried: number) {
    const stepStart = performance.now();
    const stepResult = await step(this.jobId, this.page, this.db, retried);
    const stepEnd = performance.now();

    console.log(
      `${stepName} completed: Took ${Math.round(stepEnd - stepStart)}ms`,
    );

    return stepResult;
  }
}
