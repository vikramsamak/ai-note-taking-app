import { defineConfig } from "drizzle-kit";
import { config as envConfig } from "dotenv";

envConfig();

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
