import "dotenv/config"
import { defineConfig } from "drizzle-kit";
import process from "node:process";

export default defineConfig({
    dialect: "turso",
    schema: "./schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
        authToken: process.env.DATABASE_AUTH_TOKEN!,
    },
    // dbCredentials: {
    //     url: Deno.env.get("DATABASE_URL")!,
    //     authToken: Deno.env.get("DATABASE_AUTH_TOKEN")!,
    // },
}); 