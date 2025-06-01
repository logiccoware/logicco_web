"use server";

import { createClient } from "@/lib/supabase/utils/server";
import {
  TGetTransactionsList,
  GetTransationsListSchema,
  GetTransactionsListQueryResponseSchema,
} from "@/features/transactions/schema";
import { getAccountDefaultSelectedCookie } from "@/features/accounts/api/server/actions/getAccountDefaultSelectedCookie";
import type { IGetTransactionsListOptions } from "@/features/transactions/types";
import { formatCurrency } from "@/features/accounts/helpers/currency";
import { getRangeBetweenFromMonth } from "@/lib/helpers/getRangeBetweenFromMonth";

export async function getTransactionsList({
  queryParams,
}: IGetTransactionsListOptions): Promise<TGetTransactionsList> {
  const supabase = await createClient();
  const accountDefaultSelectedCookie = await getAccountDefaultSelectedCookie();

  if (!accountDefaultSelectedCookie) {
    return GetTransationsListSchema.parse({
      account: null,
      transactions: [],
    });
  }

  const { startOfMonth, endOfMonth } = getRangeBetweenFromMonth(
    queryParams?.month
  );

  const query = supabase
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
      categories:category_id (
        id,
        name,
        parent:parent_id (
          id,
          name
        )
      ),
      payees:payee_id (
        id,
        name
      )
    `
    )
    .eq("account_id", accountDefaultSelectedCookie.id)
    .gte("date", startOfMonth)
    .lte("date", endOfMonth);

  const { data, error } = await query.order("date", { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }

  const validatedData = GetTransactionsListQueryResponseSchema.parse(data);

  const transformedTransactions = validatedData.map((transaction) => {
    const total = transaction.transaction_items.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const amount = formatCurrency(total, accountDefaultSelectedCookie.currency);

    let categoryDisplay = transaction.categories.name;
    if (transaction.categories.parent) {
      categoryDisplay = `${transaction.categories.parent.name}:${transaction.categories.name}`;
    }

    return {
      id: transaction.id,
      date: transaction.date,
      type: transaction.type,
      amount,
      category: categoryDisplay,
      payee: transaction.payees.name,
      note: transaction.note || null,
    };
  });

  return GetTransationsListSchema.parse({
    account: accountDefaultSelectedCookie,
    transactions: transformedTransactions,
  });
}
