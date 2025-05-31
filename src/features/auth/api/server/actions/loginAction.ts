"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IFormActionState } from "@/lib/types";
import { createClient } from "@/lib/supabase/utils/server";
import { formActionGenericError } from "@/lib/api/helpers/formAction";

export async function loginAction(
  prevState: unknown,
  formData: FormData
): Promise<IFormActionState> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return formActionGenericError();
  }

  revalidatePath("/", "layout");
  redirect("/app/transactions");
}
