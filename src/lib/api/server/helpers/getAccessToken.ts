"use server";

import { auth } from "@clerk/nextjs/server";

export async function getAccessTokenOrFail(): Promise<string> {
  const { getToken } = await auth();
  const accessToken = await getToken();
  if (!accessToken) {
    throw new Error("No access token found");
  }
  return accessToken;
}
