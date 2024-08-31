import { z } from "zod";

const environmentSchema = z.object({
  USERNAME: z.string(),
  PASSWORD: z.string(),
  DATABASE_URL: z.string(),
});

export const environment = environmentSchema.parse(process.env);
