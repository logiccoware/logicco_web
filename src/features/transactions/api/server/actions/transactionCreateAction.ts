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

export default async function transactionCreateAction(
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

  // Rest of your transaction creation logic...
  const { data: transaction, error: transactionError } = await supabase
    .from("transactions")
    .insert({
      date: validatedFields.data.date,
      note: validatedFields.data.note,
      account_id: validatedFields.data.accountId,
      payee_id: validatedFields.data.payeeId,
      category_id: validatedFields.data.categoryId,
      user_id: user.id,
      type: validatedFields.data.type,
    })
    .select("id")
    .single();

  if (transactionError) {
    console.error(transactionError);
    return formActionGenericError();
  }

  const { error: itemError } = await supabase.from("transaction_items").insert({
    transaction_id: transaction.id,
    amount: Math.round(parseFloat(validatedFields.data.amount) * 100),
    user_id: user.id,
  });

  if (itemError) {
    console.error(itemError);
    return formActionGenericError();
  }

  revalidatePath("app/transactions");

  return formActionSuccess();
}
