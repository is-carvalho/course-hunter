import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .string(["development", "test", "production"])
    .default("production"),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3000),
  CUSTOM_SEARCH_API_URL: z.string(),
  CUSTOM_SEARCH_API_KEY: z.string(),
  CUSTOM_SEARCH_API_SEARCH_ENGINE: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error(
    "❌ Invalid environment variable.",
    z.treeifyError(_env.error).properties,
  );

  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
