import { Page } from "playwright";

import { sendImage } from "../utils/discord.js";
import { base64ImageToBlob } from "../utils/image.js";

export async function genImage(page: Page, qmanResult: string) {
  await page.goto("https://reiwa.f5.si/newbestimg/chunithm_int/");
  await page.locator("#player_data_file").click();
  await page.locator("#player_data_file").setInputFiles({
    name: "player_data.json",
    mimeType: "application/json",
    buffer: Buffer.from(qmanResult),
  });

  if (!process.env.DEBUG) {
    // Headless
    await page.waitForTimeout(500);

    await page
      .locator("#player_data_file")
      .evaluate((el) =>
        el.dispatchEvent(new Event("change", { bubbles: true })),
      );
  }

  // Wait 5 Seconds
  await page.waitForTimeout(500);

  await page.getByRole("button", { name: "Generate" }).click();

  // Wait 5 Seconds
  await page.waitForTimeout(1000);

  // Source as Base64
  const imgSrc = await page.getAttribute("#result-img", "src");
  await sendImage("Your Best Songs Image is here!", base64ImageToBlob(imgSrc));
}
