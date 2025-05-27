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
import { PayeeFormFieldsSchema } from "@/features/payees/schema";

export default async function payeeUpdateAction(
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

  const payeeId = formData.get("payeeId") as string;

  const validatedFields = PayeeFormFieldsSchema.safeParse({
    name: formData.get("name"),
  });

  if (validatedFields.error) {
    return formsActionValidationError(
      validatedFields.error.flatten().fieldErrors
    );
  }

  const { error } = await supabase
    .from("payees")
    .update({ ...validatedFields.data, user_id: user?.id })
    .eq("id", payeeId)
    .eq("user_id", user?.id)
    .select();

  if (error) {
    console.error(error);
    return formActionGenericError();
  }

  revalidatePath("app/payees");

  return formActionSuccess();
}
