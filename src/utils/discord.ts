import { Routes } from "discord-api-types/v10";

import { environment } from "../environment.js";

const endpoint = "https://discord.com/api/v10";

export async function sendImage(
  content: string,
  blob: Blob,
  fileName = "image.jpg",
) {
  console.log(
    `Sending message and image with size of ${(blob.size / 1024).toFixed(3)} kB to Discord...`,
  );

  const formData = new FormData();
  formData.append("content", content);
  formData.append("files", blob, fileName);

  const res = await fetch(
    endpoint + Routes.channelMessages(environment.CHANNEL_ID),
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${environment.DISCORD_TOKEN}`,
      },
      body: formData,
    },
  );

  if (!res.ok) {
    console.error(`Discord API Failed ${res.status} ${res.statusText}`);
    console.error(await res.text().catch());
  }
}
