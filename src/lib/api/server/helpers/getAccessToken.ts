"use server";

export async function getAccessTokenOrFail(): Promise<string> {
  const accessToken = "";
  if (!accessToken) {
    throw new Error("No access token found");
  }
  return accessToken;
}
