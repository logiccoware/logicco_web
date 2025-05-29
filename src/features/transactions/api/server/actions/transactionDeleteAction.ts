"use server";

import { IFormActionState } from "@/lib/types";
import {
  formActionGenericError,
  formActionSuccess,
} from "@/lib/api/helpers/formAction";
import { createClient } from "@/lib/supabase/utils/server";
import { UserNotFound } from "@/features/auth/exceptions/UserNotFound";
import { revalidatePath } from "next/cache";

export default async function transactionDeleteAction(
  prevState: unknown,
  formData: FormData
): Promise<IFormActionState> {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new UserNotFound();
  }

  const transactionId = formData.get("entityId") as string;

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId)
    .eq("user_id", user.id)
    .select();

  if (error) {
    console.error(error);
    return formActionGenericError();
  }

  if (error) {
    console.error(error);
    return formActionGenericError();
  }

  revalidatePath("/app/transactions");

  return formActionSuccess();
}
