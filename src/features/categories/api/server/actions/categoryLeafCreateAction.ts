"use server";

import { IFormActionState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import {
  formActionGenericError,
  formActionSuccess,
  formsActionValidationError,
} from "@/lib/api/helpers/formAction";
import { createClient } from "@/lib/supabase/utils/server";
import { UserNotFound } from "@/features/auth/exceptions/UserNotFound";
import { CategoyFormFieldsSchema } from "@/features/categories/api/schema";

export default async function categoryLeafCreateAction(
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

  const validatedFields = CategoyFormFieldsSchema.safeParse({
    name: formData.get("name"),
  });

  if (validatedFields.error) {
    return formsActionValidationError(
      validatedFields.error.flatten().fieldErrors
    );
  }

  const rootCategoryId = formData.get("categoryId") as string;

  const { error } = await supabase
    .from("categories")
    .insert([
      {
        ...validatedFields.data,
        parent_id: rootCategoryId,
        user_id: user?.id,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    return formActionGenericError();
  }

  revalidatePath("app/categories");

  return formActionSuccess();
}
