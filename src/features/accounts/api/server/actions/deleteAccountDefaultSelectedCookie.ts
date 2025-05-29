"use server";

import { cookies } from 'next/headers';
import {  deleteCookie } from "cookies-next/server";
import { ACCOUNT_DEFAULT_SELECTED_COOKIE_NAME } from "@/features/accounts/constants";

export async function deleteAccountDefaultSelectedCookie(): Promise<void> {
  deleteCookie(ACCOUNT_DEFAULT_SELECTED_COOKIE_NAME, { cookies });
}
