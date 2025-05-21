import { URL } from "url";

export function getApiPath(path: string): URL {
  const baseUrl = process.env.NEXT_PUBLIC_LOGICCO_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_LOGICCO_API_URL is not defined");
  }
  return new URL(path, baseUrl);
}
