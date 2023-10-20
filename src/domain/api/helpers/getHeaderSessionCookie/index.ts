import { SESSION_COOKIE_NAME } from "@/domain/user/constants";

export function getHeaderSessionCookie(sessionCookieValue: string) {
  return `${SESSION_COOKIE_NAME}=${sessionCookieValue}`;
}
