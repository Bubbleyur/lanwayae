
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config();

async function main() {
  const rawUrl = process.env.DATABASE_URL_UNPOOLED;
  if (!rawUrl) {
    console.log("No DATABASE_URL_UNPOOLED found.");
    return;
  }
  
  // Strip query params
  const cleanUrl = rawUrl.split('?')[0];
  console.log("Testing Clean URL:", cleanUrl.substring(0, 30) + "...");
  
  const sql = neon(cleanUrl);
  try {
    const start = Date.now();
    const result = await Promise.race([
      sql`SELECT 1 as connected`,
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout after 10s")), 10000))
    ]);
    console.log("Success:", result);
  } catch (err: any) {
    console.error("Failed:", err.message);
  }
}

main();
