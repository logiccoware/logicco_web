import { formatCurrency } from "@/features/accounts/helpers/currency";
import { CurrencyCodeSchema } from "@/features/accounts/schema";
import { TransactionTypeSchema } from "@/features/transactions/schema";
import { createClient } from "@/lib/supabase/utils/server";
// import type { IGetTransactionsListOptions } from "@/features/transactions/types";
// import { formatCurrency } from "@/features/accounts/helpers/currency";
import { z } from "zod";

export const GetTransactionQueryResponseSchema = z.object({
  id: z.string().min(1),
  date: z.string().min(1),
  note: z.string().nullable(),
  type: TransactionTypeSchema,
  account: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    currency: CurrencyCodeSchema,
  }),
  transaction_items: z.array(
    z.object({
      id: z.string().min(1),
      amount: z.number(),
    })
  ),
  category: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    parent: z
      .object({
        id: z.string().min(1),
        name: z.string().min(1),
      })
      .nullable(),
  }),
  payee: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  }),
});

export type TGetTransaction = z.infer<typeof GetTransactionSchema>;
export const GetTransactionSchema = z.object({
  id: z.string().min(1),
  date: z.string().min(1),
  note: z.string().nullable(),
  amount: z.string().min(1),
  amountNumeric: z.number(),
  type: TransactionTypeSchema,
  account: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    currency: CurrencyCodeSchema,
  }),
  category: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    parent: z
      .object({
        id: z.string().min(1),
        name: z.string().min(1),
      })
      .nullable(),
  }),
  payee: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  }),
});

export async function getTransaction(
  transactionId: string
): Promise<TGetTransaction> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("transactions")
    .select(
      `
      id,
      date,
      note,
      created_at,
      type,
      transaction_items (
        id,
        amount
      ),
      category:category_id (
        id,
        name,
        parent:parent_id (
          id,
          name
        )
      ),
      payee:payee_id (
        id,
        name
      ),
      account:account_id (
          id,
          name,
          currency
        )
    `
    )
    .eq("id", transactionId)
    .single();

  if (error) {
    console.error("Error fetching transaction:", error);
    throw error;
  }

  const { id, date, type, category, account, payee, note, transaction_items } =
    GetTransactionQueryResponseSchema.parse(data);

  const total = transaction_items.reduce((sum, item) => sum + item.amount, 0);

  return GetTransactionSchema.parse({
    id,
    date,
    note,
    amountNumeric: total,
    amount: formatCurrency(total, account.currency),
    type,
    account,
    category,
    payee: {
      id: payee.id,
      name: payee.name,
    },
  });
}
