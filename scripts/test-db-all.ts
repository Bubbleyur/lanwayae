
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config();

async function testUrl(name: string, url: string | undefined) {
  if (!url) {
    console.log(`[${name}] No URL provided.`);
    return;
  }
  console.log(`[${name}] Testing: ${url.substring(0, 30)}...`);
  
  const sql = neon(url);
  try {
    const start = Date.now();
    const result = await Promise.race([
      sql`SELECT 1 as connected`,
      new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout after 5s")), 5000))
    ]);
    console.log(`[${name}] Success in ${Date.now() - start}ms:`, result);
  } catch (err: any) {
    console.error(`[${name}] Failed:`, err.message);
  }
}

async function main() {
  await testUrl("DATABASE_URL", process.env.DATABASE_URL);
  await testUrl("DATABASE_URL_UNPOOLED", process.env.DATABASE_URL_UNPOOLED);
}

main();
