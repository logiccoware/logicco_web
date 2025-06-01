"use server";

import { IFormActionState } from "@/lib/types";
import {
  formActionGenericError,
  formActionSuccess,
} from "@/lib/api/helpers/formAction";
import { createClient } from "@/lib/supabase/utils/server";
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
    return formActionGenericError();
  }

  const transactionId = formData.get("entityId") as string;

  try {
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
  } catch (e) {
    console.error("Error deleting transaction:", e);
    return formActionGenericError();
  }

  revalidatePath("/app/transactions");

  return formActionSuccess();
}
