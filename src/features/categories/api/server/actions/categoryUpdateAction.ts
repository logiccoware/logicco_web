"use server";

import { IFormActionState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import {
  formActionGenericError,
  formActionSuccess,
  formActionValidationError,
} from "@/lib/api/helpers/formAction";
import { UserNotFound } from "@/features/auth/exceptions/UserNotFound";
import { createClient } from "@/lib/supabase/utils/server";
import { CategoyFormFieldsSchema } from "@/features/categories/api/schema";

export default async function categoryUpdateAction(
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

  const categoryId = formData.get("categoryId") as string;

  const validatedFields = CategoyFormFieldsSchema.safeParse({
    name: formData.get("name"),
  });

  if (validatedFields.error) {
    return formActionValidationError(
      validatedFields.error.flatten().fieldErrors
    );
  }

  const { error } = await supabase
    .from("categories")
    .update({ ...validatedFields.data, user_id: user?.id })
    .eq("id", categoryId)
    .eq("user_id", user?.id)
    .select();

  if (error) {
    console.error(error);
    return formActionGenericError();
  }

  revalidatePath("app/categories");

  return formActionSuccess();
}
