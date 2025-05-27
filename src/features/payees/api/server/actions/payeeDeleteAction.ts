"use server";

import { IFormActionState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import {
  formActionGenericError,
  formActionSuccess,
} from "@/lib/api/helpers/formAction";
import { UserNotFound } from "@/features/auth/exceptions/UserNotFound";
import { createClient } from "@/lib/supabase/utils/server";

export default async function payeeDeleteAction(
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

  const payeeId = formData.get("entityId") as string;

  const { error } = await supabase
    .from("payees")
    .delete()
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
