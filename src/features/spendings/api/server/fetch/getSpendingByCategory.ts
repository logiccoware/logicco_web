import { formatCurrency } from "@/features/accounts/helpers/currency";
import { createClient } from "@/lib/supabase/utils/server";
import { z } from "zod";
import { TAccountDefaultSelectedCookie } from "@/features/accounts/schema";
import currency from "currency.js";
import { CHART_COLORS } from "@/features/spendings/constants";
import { getTransactionType } from "@/features/transactions/helpers/getTransactionType";
import { getRangeBetweenFromMonth } from "@/lib/helpers/getRangeBetweenFromMonth";

export interface IGetSpendingByCategoryOptions {
  transactionType?: string;
  month?: string;
  account: TAccountDefaultSelectedCookie | null;
}

// --- Zod Schemas for Raw Supabase Response ---
const CategoryDataSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

const ParentCategoryDataSchema = CategoryDataSchema.nullable();

const RawCategoryWithParentSchema = CategoryDataSchema.extend({
  parent: ParentCategoryDataSchema,
});

const RawTransactionItemSchema = z.object({
  amount: z.number(),
});

const RawTransactionWithCategoryAndItemsSchema = z.object({
  // id: z.string().min(1), // Transaction ID, if needed
  // date: z.string().min(1), // Transaction Date, if needed
  // type: TransactionTypeSchema, // Transaction Type, if needed
  category: RawCategoryWithParentSchema, // Category is directly on the transaction
  transaction_items: z.array(RawTransactionItemSchema), // Items to sum amounts
});

const RawQueryResponseSchema = z.array(
  RawTransactionWithCategoryAndItemsSchema
);

export const CategorySpendingPieChartSchema = z.object({
  name: z.string().min(1),
  value: z.number(),
  color: z.string().min(1),
});
export type TCategorySpendingPieChart = z.infer<
  typeof CategorySpendingPieChartSchema
>;

export const CategorySpendingChildItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  amount: z.string().min(1),
});
export type TCategorySpendingChildItem = z.infer<
  typeof CategorySpendingChildItemSchema
>;

export const CategorySpendingListItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  totalAmount: z.string().min(1),
  children: z.array(CategorySpendingChildItemSchema),
});
export type TCategorySpendingListItem = z.infer<
  typeof CategorySpendingListItemSchema
>;

export const GetSpendingByCategorySchema = z.object({
  hasDefaultSelectedAccount: z.boolean(),
  pieChartData: z.array(CategorySpendingPieChartSchema),
  list: z.array(CategorySpendingListItemSchema),
});
export type TGetSpendingByCategory = z.infer<
  typeof GetSpendingByCategorySchema
>;

export async function getSpendingByCategory({
  transactionType,
  month,
  account,
}: IGetSpendingByCategoryOptions): Promise<TGetSpendingByCategory> {
  const supabase = await createClient();

  if (!account) {
    return {
      hasDefaultSelectedAccount: false,
      list: [],
      pieChartData: [],
    };
  }

  const { startOfMonth, endOfMonth } = getRangeBetweenFromMonth(month);

  const { data: rawTransactions, error } = await supabase
    .from("transactions")
    .select(
      `
      id, 
      date, 
      type,
      category:category_id!inner (
        id,
        name,
        parent:parent_id (id, name)
      ),
      transaction_items:transaction_items!inner (
        amount
      )
    `
    )
    .eq("account_id", account.id)
    .eq("type", getTransactionType(transactionType))
    .not("category_id", "is", null) // Ensure transaction has a category
    .gte("date", startOfMonth)
    .lte("date", endOfMonth);

  if (error) {
    console.error("Error fetching transactions for category spending:", error);
    throw new Error(
      `Supabase error: ${error.message} (Code: ${error.code}, Details: ${error.details})`
    );
  }

  const parsedTransactions = RawQueryResponseSchema.parse(rawTransactions);

  const aggregatedCategories = new Map<
    string,
    {
      id: string;
      name: string;
      totalAmount: number;
      children: Map<string, { id: string; name: string; amount: number }>;
    }
  >();

  parsedTransactions.forEach((transaction) => {
    // Sum all item amounts for this transaction
    const totalAmountForTransaction = transaction.transaction_items.reduce(
      (sum, item) => currency(sum).add(item.amount).value,
      0
    );

    if (totalAmountForTransaction === 0) {
      return; // Skip if transaction has no value
    }

    const directCategory = transaction.category; // Category is at the transaction level

    let mainListCategoryId: string;
    let mainListCategoryName: string;
    let childCategoryId: string | null = null;
    let childCategoryName: string | null = null;

    if (directCategory.parent) {
      mainListCategoryId = directCategory.parent.id;
      mainListCategoryName = directCategory.parent.name;
      childCategoryId = directCategory.id;
      childCategoryName = directCategory.name;
    } else {
      mainListCategoryId = directCategory.id;
      mainListCategoryName = directCategory.name;
    }

    if (!aggregatedCategories.has(mainListCategoryId)) {
      aggregatedCategories.set(mainListCategoryId, {
        id: mainListCategoryId,
        name: mainListCategoryName,
        totalAmount: 0,
        children: new Map(),
      });
    }

    const mainCategoryEntry = aggregatedCategories.get(mainListCategoryId)!;
    mainCategoryEntry.totalAmount = currency(mainCategoryEntry.totalAmount).add(
      totalAmountForTransaction
    ).value;

    if (childCategoryId && childCategoryName) {
      if (!mainCategoryEntry.children.has(childCategoryId)) {
        mainCategoryEntry.children.set(childCategoryId, {
          id: childCategoryId,
          name: childCategoryName,
          amount: 0,
        });
      }
      const childEntry = mainCategoryEntry.children.get(childCategoryId)!;
      childEntry.amount = currency(childEntry.amount).add(
        totalAmountForTransaction
      ).value;
    }
  });

  const list: TCategorySpendingListItem[] = [];
  const pieChartData: TCategorySpendingPieChart[] = [];
  let colorIndex = 0;

  aggregatedCategories.forEach((categoryData) => {
    const childrenList: TCategorySpendingChildItem[] = [];
    categoryData.children.forEach((child) => {
      childrenList.push({
        id: child.id,
        name: child.name,
        amount: formatCurrency(child.amount, account.currency),
      });
    });

    childrenList.sort(
      (a, b) =>
        parseFloat(b.amount.replace(/[^0-9.-]+/g, "")) -
        parseFloat(a.amount.replace(/[^0-9.-]+/g, ""))
    );

    list.push({
      id: categoryData.id,
      name: categoryData.name,
      totalAmount: formatCurrency(categoryData.totalAmount, account.currency),
      children: childrenList,
    });

    pieChartData.push({
      name: categoryData.name,
      value: currency(categoryData.totalAmount, { fromCents: true }).value,
      color: CHART_COLORS[colorIndex % CHART_COLORS.length],
    });
    colorIndex++;
  });

  list.sort(
    (a, b) =>
      parseFloat(b.totalAmount.replace(/[^0-9.-]+/g, "")) -
      parseFloat(a.totalAmount.replace(/[^0-9.-]+/g, ""))
  );

  pieChartData.sort((a, b) => b.value - a.value);

  return {
    hasDefaultSelectedAccount: true,
    list,
    pieChartData,
  };
}
