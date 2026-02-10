
import pg from "pg";
import { config } from "dotenv";

config();

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.log("No DATABASE_URL found.");
    return;
  }
  
  console.log("Testing TCP connection with 'pg' driver...");
  const client = new pg.Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const start = Date.now();
    await client.connect();
    console.log("Connected to database via TCP");
    const res = await client.query('SELECT 1 as connected');
    console.log("Query Success in", Date.now() - start, "ms:", res.rows);
    await client.end();
  } catch (err: any) {
    console.error("TCP Connection Failed:", err.message);
  }
}

main();
