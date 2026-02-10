"use server";

import { LanyardResponse } from "@/types/lanyard";

export async function getLanyardData(userId: string): Promise<LanyardResponse> {
  const res = await fetch(`https://api.lanyard.rest/v1/users/${userId}`, {
    next: { revalidate: 0 }, // Disable cache for real-time-ish data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Lanyard data");
  }

  return res.json();
}
