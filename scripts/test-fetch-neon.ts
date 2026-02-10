
import { config } from "dotenv";

config();

async function testFetch(url: string | undefined) {
  if (!url) return;
  const match = url.match(/postgresql:\/\/([^:]+):([^@]+)@([^/]+)\/(.+)/);
  if (!match) {
    console.log("Invalid URL format");
    return;
  }
  const [_, user, password, host, db] = match;
  const endpoint = `https://${host}/sql`;
  console.log(`Testing Fetch to: ${endpoint}`);
  
  try {
    const start = Date.now();
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 'SELECT 1 as connected',
        params: [],
        database: db,
        password: password
      })
    });
    const data = await response.json();
    console.log(`Fetch Success in ${Date.now() - start}ms:`, data);
  } catch (err: any) {
    console.error(`Fetch Failed:`, err.message);
  }
}

testFetch(process.env.DATABASE_URL_UNPOOLED);
