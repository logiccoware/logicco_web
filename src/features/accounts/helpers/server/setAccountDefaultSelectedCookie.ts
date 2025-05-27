"use server";

import { cookies } from 'next/headers';
import { setCookie } from "cookies-next/server";
import { ACCOUNT_DEFAULT_SELECTED_COOKIE_NAME } from "@/features/accounts/constants";
import {
  AccountDefaultSelectedCookieSchema,
} from "@/features/accounts/schema";

export async function setAccountDefaultSelectedCookie(
  value: unknown
): Promise<void> {
  const validatedValue = AccountDefaultSelectedCookieSchema.safeParse(value); 
  if (validatedValue.success) {
    setCookie(ACCOUNT_DEFAULT_SELECTED_COOKIE_NAME, validatedValue.data, { cookies });
  }
}
