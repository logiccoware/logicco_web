"use server";

import { IFormActionState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import {
  formActionSuccess,
  formActionGenericError,
  formsActionValidationError,
} from "@/lib/api/helpers/formAction";
import { createClient } from "@/lib/supabase/utils/server";
import { PayeeFormFieldsSchema } from "@/features/payees/schema";
import { UserNotFound } from "@/features/auth/exceptions/UserNotFound";

export default async function createPayeeAction(
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

  revalidatePath("app/payees");

  return formActionSuccess();
}
