
import { db } from "@/lib/db";
import { guestbookTable } from "@/lib/db/schema/guestbook";

async function main() {
  const messages = await db.select().from(guestbookTable);
  console.log("Messages count:", messages.length);
  if (messages.length > 0) {
    console.log("First message:", messages[0]);
  } else {
    console.log("No messages found.");
  }
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
