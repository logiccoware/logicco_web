"use server";

import { IFormActionState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { formActionGenericError } from "@/lib/api/helpers/formAction";
import { createClient } from "@/lib/supabase/utils/server";
import { UserNotFound } from "@/features/auth/exceptions/UserNotFound";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

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

  const headersList = await headers();
  const referer = headersList.get("referer") || "";
  const url = new URL(referer);
  const queryString = url.search;

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

  revalidatePath("app/transactions");

  redirect(`/app/transactions${queryString}`);
}
