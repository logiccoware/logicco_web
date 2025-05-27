"use server";

import { IFormActionState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import {
  formActionGenericError,
  formActionSuccess,
} from "@/lib/api/helpers/formAction";
import { UserNotFound } from "@/features/auth/exceptions/UserNotFound";
import { createClient } from "@/lib/supabase/utils/server";
import { cookies } from "next/headers";
import { decodeAccountDefaultSelectedCookie } from "@/features/accounts/helpers/decodeAccountDefaultCookie";
import { ACCOUNT_DEFAULT_SELECTED_COOKIE_NAME } from "@/features/accounts/constants";

export default async function accountDeleteAction(
  prevState: unknown,
  formData: FormData
): Promise<IFormActionState> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new UserNotFound();
  }

  const accountId = formData.get("entityId") as string;

  const cookieStore = await cookies();
  const accountDefaultSelected = decodeAccountDefaultSelectedCookie(
    cookieStore.get(ACCOUNT_DEFAULT_SELECTED_COOKIE_NAME)?.value
  );

  const { error } = await supabase
    .from("accounts")
    .delete()
    .eq("id", accountId)
    .eq("user_id", user?.id)
    .select();

  if (error) {
    console.error(error);
    return formActionGenericError();
  }

  if (accountDefaultSelected?.id === accountId) {
    cookieStore.delete(ACCOUNT_DEFAULT_SELECTED_COOKIE_NAME);
  }

  revalidatePath("app/accounts");

  return formActionSuccess();
}
