import { config } from "dotenv";
config();

const required = [
  "DATABASE_URL",
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
  "DISCORD_CLIENT_ID",
  "DISCORD_CLIENT_SECRET",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "BETTER_AUTH_SECRET",
  "BETTER_AUTH_URL",
];

console.log("Checking Environment Variables...");
required.forEach((key) => {
  if (process.env[key]) {
    console.log(`✅ ${key} is set`);
  } else {
    console.log(`❌ ${key} is MISSING`);
  }
});
