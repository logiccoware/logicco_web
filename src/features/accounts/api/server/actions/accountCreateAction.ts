"use server";

import { IFormActionState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import {
  formActionSuccess,
  formActionGenericError,
  formsActionValidationError,
} from "@/lib/api/helpers/formAction";
import { createClient } from "@/lib/supabase/utils/server";
import { AccountFormFieldsSchema } from "@/features/accounts/schema";
import { UserNotFound } from "@/features/auth/exceptions/UserNotFound";
import { setAccountDefaultSelectedCookie } from "@/features/accounts/helpers/server/setAccountDefaultSelectedCookie";

export default async function createAccountAction(
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

  const { error, data } = await supabase
    .from("accounts")
    .insert([
      {
        ...validatedFields.data,
        user_id: user?.id,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    return formActionGenericError();
  }

  if (markAsDefault) {
    setAccountDefaultSelectedCookie(data[0] ?? null);
  }

  revalidatePath("app/accounts");

  return formActionSuccess();
}
