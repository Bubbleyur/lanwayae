import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config();

async function checkTables() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is missing");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log("Checking tables in database...");
    const result = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `;
    
    const tables = result.map(r => r.table_name);
    console.log("Found tables:", tables);
    
    if (tables.includes('user') && tables.includes('session')) {
      console.log("✅ Auth tables exist.");
    } else {
      console.log("❌ Auth tables MISSING.");
    }
  } catch (error) {
    console.error("Error querying DB:", error);
  }
}

checkTables();
