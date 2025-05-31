import { formatCurrency } from "@/features/accounts/helpers/currency";
import { createClient } from "@/lib/supabase/utils/server";
import { z } from "zod";
import dayjs from "dayjs";
import { TAccountDefaultSelectedCookie } from "@/features/accounts/schema";
import { TransactionTypeSchema } from "@/features/transactions/schema";
import currency from "currency.js";
import { CHART_COLORS } from "@/features/spendings/constants";
import { getTransactionType } from "@/features/transactions/helpers/getTransactionType";

export interface IGetSpendingByPayeeOptions {
  transactionType?: string;
  month?: string;
  account: TAccountDefaultSelectedCookie | null;
}

const RawQueryResponse = z.array(
  z.object({
    id: z.string().min(1),
    date: z.string().min(1),
    type: TransactionTypeSchema,
    transaction_items: z.array(
      z.object({
        id: z.string().min(1),
        amount: z.number(),
      })
    ),
    payee: z.object({
      id: z.string().min(1),
      name: z.string().min(1),
    }),
  })
);

export type TPayeeSpendingPieChart = z.infer<
  typeof PayeeSpendingPieChartSchema
>;
export const PayeeSpendingPieChartSchema = z.object({
  name: z.string().min(1),
  value: z.number(),
  color: z.string().min(1),
});

export type TPayeeSpending = z.infer<typeof PayeeSpendingListSchema>;
export const PayeeSpendingListSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  amount: z.string().min(1),
});

export type TGetSpendingByPayee = z.infer<typeof GetSpendingByPayeeSchema>;
export const GetSpendingByPayeeSchema = z.object({
  hasDefaultSelectedAccount: z.boolean(),
  pieChartData: z.array(PayeeSpendingPieChartSchema),
  list: z.array(PayeeSpendingListSchema),
});

export async function getSpendingByPayee({
  month,
  account,
  transactionType,
}: IGetSpendingByPayeeOptions): Promise<TGetSpendingByPayee> {
  const supabase = await createClient();

  if (!account) {
    return {
      hasDefaultSelectedAccount: false,
      list: [],
      pieChartData: [],
    };
  }

  // Get start and end dates for the month
  const monthParam = month || dayjs().format("YYYY-MM-DD");
  const startOfMonth = dayjs(monthParam).startOf("month").format("YYYY-MM-DD");
  const endOfMonth = dayjs(monthParam)
    .endOf("month")
    .format("YYYY-MM-DD 23:59:59.999");

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select(
      `
      id,
      date,
      type,        
      payee:payees(id, name),
      transaction_items:transaction_items(id, amount)
    `
    )
    .eq("account_id", account.id)
    .eq("type", getTransactionType(transactionType))
    .gte("date", startOfMonth)
    .lte("date", endOfMonth)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching payee spendings:", error);
    throw error;
  }

  const queryRes = RawQueryResponse.parse(transactions);

  // Group transactions by payee and calculate total amount
  const payeeMap = new Map<
    string,
    { id: string; name: string; totalAmount: number }
  >();

  queryRes.forEach((transaction) => {
    if (!transaction.payee) return;

    const payee = Array.isArray(transaction.payee)
      ? transaction.payee[0]
      : transaction.payee;

    if (!payee || !payee.id) return;

    const payeeId = payee.id;
    const payeeName = payee.name;

    let totalAmount = 0;
    transaction.transaction_items.forEach((item) => {
      // No need to divide by 100, the values are already correct
      totalAmount = currency(totalAmount).add(item.amount).value;
    });

    if (payeeMap.has(payeeId)) {
      const existingPayee = payeeMap.get(payeeId)!;
      existingPayee.totalAmount = currency(existingPayee.totalAmount).add(
        totalAmount
      ).value;
    } else {
      payeeMap.set(payeeId, {
        id: payeeId,
        name: payeeName,
        totalAmount: totalAmount,
      });
    }
  });

  const list: TPayeeSpending[] = [];
  const pieChartData: TPayeeSpendingPieChart[] = [];

  let colorIndex = 0;

  payeeMap.forEach((payee) => {
    list.push({
      id: payee.id,
      name: payee.name,
      amount: formatCurrency(payee.totalAmount, account.currency),
    });

    pieChartData.push({
      name: payee.name,
      value: currency(payee.totalAmount, { fromCents: true }).value,
      color: CHART_COLORS[colorIndex % CHART_COLORS.length],
    });

    colorIndex++;
  });

  // Sort list by amount (highest to lowest)
  list.sort(
    (a, b) =>
      parseFloat(b.amount.replace(/[^0-9.-]+/g, "")) -
      parseFloat(a.amount.replace(/[^0-9.-]+/g, ""))
  );

  // Sort pie chart data by value (highest to lowest)
  pieChartData.sort((a, b) => b.value - a.value);

  return {
    hasDefaultSelectedAccount: true,
    list,
    pieChartData,
  };
}
