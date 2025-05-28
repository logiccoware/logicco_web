"use server";

import { createClient } from "@/lib/supabase/utils/server";
import {
  TGetTransactionsList,
  GetTransationsListSchema,
  GetTransactionsListQueryResponseSchema,
} from "@/features/transactions/schema";
import { getAccountDefaultSelectedCookie } from "@/features/accounts/helpers/server/getAccountDefaultSelectedCookie";
import type { IGetTransactionsListOptions } from "@/features/transactions/types";
import { formatCurrency } from "@/features/accounts/helpers/currency";
import dayjs from "dayjs";

export async function getTransactionsListSchema({
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

  // Get start and end dates for the month
  const monthParam = queryParams.month || dayjs().format("YYYY-MM-DD");
  const startOfMonth = dayjs(monthParam).startOf("month").format("YYYY-MM-DD");
  const endOfMonth = dayjs(monthParam).endOf("month").format("YYYY-MM-DD");

  const query = supabase
    .from("transactions")
    .select(
      `
      id,
      date,
      note,
      created_at,
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
