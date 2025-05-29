"use server";

import { cookies } from 'next/headers';
import { getCookie } from "cookies-next/server";
import { ACCOUNT_DEFAULT_SELECTED_COOKIE_NAME } from "@/features/accounts/constants";
import {
  AccountDefaultSelectedCookieSchema,
  TAccountDefaultSelectedCookie,
} from "@/features/accounts/schema";

export async function getAccountDefaultSelectedCookie(): Promise<TAccountDefaultSelectedCookie | null> {
  const cookie = await getCookie(ACCOUNT_DEFAULT_SELECTED_COOKIE_NAME, { cookies });
  const validatedValue = AccountDefaultSelectedCookieSchema.safeParse(JSON.parse(cookie || '{}'));
  if (validatedValue.success) {
    return validatedValue.data;
  }
  return null;
}

