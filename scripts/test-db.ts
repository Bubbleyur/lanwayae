
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config();

async function main() {
  console.log("Connecting to:", process.env.DATABASE_URL?.substring(0, 30) + "...");
  const sql = neon(process.env.DATABASE_URL!);
  try {
    const result = await sql`SELECT 1 as connected`;
    console.log("Database result:", result);
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

main();
