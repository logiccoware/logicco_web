"use server";

import { IFormActionState } from "@/lib/types";
import { revalidatePath } from "next/cache";
import {
  formActionGenericError,
  formActionSuccess,
  formActionValidationError,
} from "@/lib/api/helpers/formAction";
import { createClient } from "@/lib/supabase/utils/server";
import { TransactionFormValidationSchema } from "@/features/transactions/schema";
import { UserNotFound } from "@/features/auth/exceptions/UserNotFound";
// import { redirect } from "next/navigation";
// import { headers } from "next/headers";

export default async function transactionUpdateAction(
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

  // const headersList = await headers();
  // const referer = headersList.get("referer") || "";
  // const url = new URL(referer);
  // const queryString = url.search;

  const transactionId = formData.get("transactionId");

  if (!transactionId) {
    return formActionGenericError();
  }

  const formDataFields = {
    amount: formData.get("amount"),
    date: formData.get("date"),
    categoryId: formData.get("categoryId") ?? "",
    payeeId: formData.get("payeeId"),
    note: formData.get("note"),
    type: formData.get("type"),
    accountId: formData.get("accountId") ?? "",
  };

  const validatedFields =
    TransactionFormValidationSchema.safeParse(formDataFields);

  if (validatedFields.error) {
    return formActionValidationError(
      validatedFields.error.flatten().fieldErrors
    );
  }

  const { error: transactionError } = await supabase
    .from("transactions")
    .update({
      date: validatedFields.data.date,
      note: validatedFields.data.note,
      account_id: validatedFields.data.accountId,
      payee_id: validatedFields.data.payeeId,
      category_id: validatedFields.data.categoryId,
      type: validatedFields.data.type,
    })
    .eq("id", transactionId)
    .eq("user_id", user.id);

  if (transactionError) {
    console.error(transactionError);
    return formActionGenericError();
  }
  const { data: items, error: findError } = await supabase
    .from("transaction_items")
    .select("id")
    .eq("transaction_id", transactionId)
    .eq("user_id", user.id);

  if (findError) {
    console.error(findError);
    return formActionGenericError();
  }

  if (!items || items.length === 0) {
    return formActionGenericError();
  }

  // Update the first (and should be only) transaction item
  const { error: itemError } = await supabase
    .from("transaction_items")
    .update({
      amount: Math.round(parseFloat(validatedFields.data.amount) * 100),
    })
    .eq("id", items[0].id)
    .eq("user_id", user.id);

  if (itemError) {
    console.error(itemError);
    return formActionGenericError();
  }

  revalidatePath("app/transactions");

  return formActionSuccess();

  // redirect(`/app/transactions${queryString}`);
}
