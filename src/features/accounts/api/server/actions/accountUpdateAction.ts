"use server";

import { IFormActionState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import {
  formActionGenericError,
  formActionSuccess,
  formsActionValidationError,
} from "@/lib/api/helpers/formAction";
import { UserNotFound } from "@/features/auth/exceptions/UserNotFound";
import { createClient } from "@/lib/supabase/utils/server";
import { AccountFormFieldsSchema } from "@/features/accounts/schema";
import { getAccountDefaultSelectedCookie } from "@/features/accounts/helpers/server/getAccountDefaultSelectedCookie";
import { setAccountDefaultSelectedCookie } from "@/features/accounts/helpers/server/setAccountDefaultSelectedCookie";
import { deleteAccountDefaultSelectedCookie } from "@/features/accounts/helpers/server/deleteAccountDefaultSelectedCookie";

export default async function accountUpdateAction(
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

  const accountId = formData.get("accountId") as string;
  const markAsDefault = formData.get("markAsDefault") === "on";

  const validatedFields = AccountFormFieldsSchema.safeParse({
    name: formData.get("name"),
    currency: formData.get("currency"),
  });

  if (validatedFields.error) {
    return formsActionValidationError(
      validatedFields.error.flatten().fieldErrors
    );
  }

  const accountDefaultSelectedCookie = await getAccountDefaultSelectedCookie();

  const { error, data } = await supabase
    .from("accounts")
    .update({ ...validatedFields.data, user_id: user?.id })
    .eq("id", accountId)
    .eq("user_id", user?.id)
    .select();

  if (error) {
    console.error(error);
    return formActionGenericError();
  }

  if (markAsDefault) {
    setAccountDefaultSelectedCookie(data[0] ?? null);
  }

  if (accountDefaultSelectedCookie?.id === accountId && !markAsDefault) {
    deleteAccountDefaultSelectedCookie();
  }

  revalidatePath("app/accounts");

  return formActionSuccess();
}
