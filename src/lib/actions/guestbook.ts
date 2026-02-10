"use server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { verifyTurnstileToken } from "@/lib/actions/turnstile";

import emojiRegex from "emoji-regex";
import stringLength from "string-length";
import { LRUCache } from "lru-cache";

import { eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  guestbookTable,
  guestbookReactionTable,
} from "@/lib/db/schema/guestbook";
import { user as userTable } from "../db/schema/auth";

// LRU Cache with 5 minute TTL for guestbook messages
const guestbookCache = new LRUCache<string, MessageWithReactions[]>({
  max: 100, // Maximum number of cache entries
  ttl: 1000 * 60 * 5, // 5 minutes in milliseconds
});

// === User Actions === //

export async function submitMessage(
  turnstileToken: string,
  message: string,
  props: { threadId?: string; anonymous?: boolean } = {},
) {
  if (message.trim().length === 0) return "empty-message";
  if (message.length > 1024) return "message-too-long";
  if (message.split("\n").length > 3) return "message-too-many-lines";

  const verified = await verifyTurnstileToken(turnstileToken);
  if (!verified) return "turnstile-failed";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return "not-authenticated";

  const guestbook: typeof guestbookTable.$inferInsert = {
    userId: session.user.id,
    message: message,
    threadId: props.threadId,
    anonymous: props.anonymous,
  };

  await db.insert(guestbookTable).values(guestbook);

  // Invalidate cache after new message
  guestbookCache.delete("guestbook:messages");

  return "success";
}

export async function editMessage(id: string, message: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return "not-authenticated";

  const oldMessage = await db
    .select()
    .from(guestbookTable)
    .where(eq(guestbookTable.id, id));

  const guestbook: typeof guestbookTable.$inferInsert = {
    userId: session.user.id,
    message: message,
    editHistory:
      oldMessage.length === 0
        ? [
            // add the original message to history
            {
              message: oldMessage[0].message,
              createdAt: oldMessage[0].createdAt,
            },
            {
              message: message,
              createdAt: new Date(),
            },
          ]
        : [
            ...(oldMessage[0].editHistory || []),
            {
              message: message,
              createdAt: new Date(),
            },
          ],
    editedAt: new Date(),
  };

  await db
    .update(guestbookTable)
    .set(guestbook)
    .where(eq(guestbookTable.id, id));

  // Invalidate cache after edit
  guestbookCache.delete("guestbook:messages");

  return "success";
}

export async function reactMessage(
  action: "add" | "remove",
  id: string,
  emoji: string,
  turnstileToken?: string,
) {
  if (action === "add") {
    if (turnstileToken) {
      const verified = await verifyTurnstileToken(turnstileToken);
      if (!verified) return "turnstile-failed";
    } else {
      return "turnstile-failed";
    }
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return "not-authenticated";

  // validate emoji and limit length
  if (!emojiRegex().test(emoji)) return "invalid-emoji";
  if (stringLength(emoji) > 1) return "emoji-too-long";

  const reaction = await db
    .select()
    .from(guestbookReactionTable)
    .where(eq(guestbookReactionTable.guestbookId, id));

  const isEmojiExist = reaction.find((r) => r.emoji === emoji);

  if (action === "add") {
    if (isEmojiExist) {
      if ((isEmojiExist.userIds ?? []).includes(session.user.id)) {
        return "success";
      }

      // add user to existing reaction
      await db
        .update(guestbookReactionTable)
        .set({
          userIds: [...(isEmojiExist.userIds ?? []), session.user.id],
          lastUpdatedAt: new Date(),
        })
        .where(eq(guestbookReactionTable.id, isEmojiExist.id));
    } else {
      // create new reaction
      const newReaction: typeof guestbookReactionTable.$inferInsert = {
        guestbookId: id,
        userIds: [session.user.id],
        emoji: emoji,
      };
      await db.insert(guestbookReactionTable).values(newReaction);
    }
  } else {
    if (isEmojiExist) {
      if (!(isEmojiExist.userIds ?? []).includes(session.user.id)) {
        return "success";
      }

      const updatedUserIds = (isEmojiExist.userIds || []).filter(
        (userId) => userId !== session.user.id,
      );
      if (updatedUserIds.length === 0) {
        // remove reaction if no users left
        await db
          .delete(guestbookReactionTable)
          .where(eq(guestbookReactionTable.id, isEmojiExist.id));
      } else {
        // update reaction by removing user
        await db
          .update(guestbookReactionTable)
          .set({
            userIds: updatedUserIds,
            lastUpdatedAt: new Date(),
          })
          .where(eq(guestbookReactionTable.id, isEmojiExist.id));
      }
    }
  }

  // Invalidate cache after reaction change
  guestbookCache.delete("guestbook:messages");

  return "success";
}

// === User Actions === //

// === Server Actions === //

export type MessageWithReactions = typeof guestbookTable.$inferSelect & {
  reactions: (typeof guestbookReactionTable.$inferSelect & {
    users: Omit<
      typeof userTable.$inferSelect,
      "email" | "emailVerified" | "createdAt" | "updatedAt"
    >[];
  })[];
  user: Omit<
    typeof userTable.$inferSelect,
    "email" | "emailVerified" | "createdAt" | "updatedAt"
  >;
};

export async function getMessages(): Promise<MessageWithReactions[]> {
  const cacheKey = "guestbook:messages";

  // Check if data is in cache
  const cached = guestbookCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  // 1. Fetch all messages
  const dbMessages = await db
    .select()
    .from(guestbookTable)
    .orderBy(guestbookTable.createdAt);

  if (dbMessages.length === 0) {
    guestbookCache.set(cacheKey, []);
    return [];
  }

  // 2. Collect IDs for batch fetching
  const messageIds = dbMessages.map((msg) => msg.id);
  const messageUserIds = new Set(dbMessages.map((msg) => msg.userId));

  // 3. Fetch all reactions for these messages
  const allReactions = await db
    .select()
    .from(guestbookReactionTable)
    .where(inArray(guestbookReactionTable.guestbookId, messageIds));

  // 4. Collect all User IDs from reactions
  for (const reaction of allReactions) {
    if (reaction.userIds) {
      for (const uid of reaction.userIds) {
        messageUserIds.add(uid);
      }
    }
  }

  // 5. Fetch all related users in one query
  const allUserIdsArray = Array.from(messageUserIds).filter(Boolean);
  
  let allUsers: (typeof userTable.$inferSelect)[] = [];
  if (allUserIdsArray.length > 0) {
    allUsers = await db
      .select()
      .from(userTable)
      .where(inArray(userTable.id, allUserIdsArray));
  }

  // 6. Create User Map for O(1) lookup
  const userMap = new Map<string, typeof userTable.$inferSelect>();
  for (const user of allUsers) {
    userMap.set(user.id, user);
  }

  // 7. Group reactions by message ID
  const reactionsByMessageId = new Map<string, typeof allReactions>();
  for (const reaction of allReactions) {
    const existing = reactionsByMessageId.get(reaction.guestbookId) || [];
    existing.push(reaction);
    reactionsByMessageId.set(reaction.guestbookId, existing);
  }

  // 8. Construct final response
  const messages: MessageWithReactions[] = dbMessages.map((message) => {
    const messageReactions = reactionsByMessageId.get(message.id) || [];
    
    // Map string[] userIds to full User objects for each reaction
    const mappedReactions = messageReactions.map((reaction) => {
      const reactionUsers = (reaction.userIds || [])
        .map((uid) => userMap.get(uid))
        .filter((u): u is typeof userTable.$inferSelect => !!u)
        .map((u) => ({
          id: u.id,
          name: u.name,
          image: u.image,
        }));

      return {
        ...reaction,
        users: reactionUsers,
      };
    });

    // Get message author
    const author = userMap.get(message.userId);
    // Fallback if author not found (shouldn't happen with referential integrity, but safe to handle)
    const authorSanitized = author
      ? { id: author.id, name: author.name, image: author.image }
      : { id: message.userId, name: "Unknown", image: null };

    return {
      ...message,
      reactions: mappedReactions,
      user: authorSanitized,
    };
  });

  // Store in cache
  guestbookCache.set(cacheKey, messages);

  return messages;
}

export async function clearGuestbookCache() {
  guestbookCache.clear();
  return { success: true, message: "Guestbook cache cleared" };
}

// === Server Actions === //
