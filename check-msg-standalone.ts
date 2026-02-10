
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

config();

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function main() {
  try {
    const result = await sql`SELECT count(*) FROM guestbook_message`;
    console.log("Messages count:", result[0].count);
    
    if (Number(result[0].count) > 0) {
        const first = await sql`SELECT * FROM guestbook_message LIMIT 1`;
        console.log("First message:", first[0]);
    } else {
        console.log("No messages found in DB.");
    }
  } catch (e) {
    console.error("Error querying DB:", e);
  }
}

main();
