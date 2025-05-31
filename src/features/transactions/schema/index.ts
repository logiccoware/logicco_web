import { CurrencyCodeSchema } from "@/features/accounts/schema";
import { z } from "zod";

export type TTransactionType = z.infer<typeof TransactionTypeSchema>;
export const TransactionTypeSchema = z.enum(["INCOME", "EXPENSE"], {
  message: "Invalid transaction type",
});

export type TTransactionFormValidationSchema = z.infer<
  typeof TransactionFormValidationSchema
>;
export const TransactionFormValidationSchema = z.object({
  date: z
    .string({
      message: "Invalid date format",
    })
    .min(1, "Date is required"),
  amount: z
    .string({
      message: "Invalid amount format",
    })
    .min(1, "Amount is required"),
  categoryId: z
    .string({ message: "Invalid category" })
    .min(1, "Category is required"),
  payeeId: z
    .string({
      message: "Invalid payee",
    })
    .min(1, "Payee is required"),
  note: z
    .string({
      message: "Invalid note",
    })
    .nullable(),
  type: TransactionTypeSchema,
  accountId: z
    .string({
      message: "Invalid account",
    })
    .min(1, "Account is required"),
});


export const GetTransactionsListQueryResponseSchema = z.array(
  z.object({
    id: z.string().min(1),
    date: z.string().min(1),
    note: z.string().nullable(),
    created_at: z.string().min(1),
    type: TransactionTypeSchema,
    transaction_items: z.array(
      z.object({
        id: z.string().min(1),
        amount: z.number(),
      })
    ),
    categories: z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      parent: z
        .object({
          id: z.string().min(1),
          name: z.string().min(1),
        })
        .nullable(),
    }),
    payees: z.object({
      id: z.string().min(1),
      name: z.string().min(1),
    }),
  })
);

export type TTransaction = z.infer<typeof TransactionSchema>;
export const TransactionSchema = z.object({
  id: z.string().min(1),
  amount: z.string().min(1),
  date: z.string().min(1),
  category: z.string().min(1),
  payee: z.string().min(1),
  note: z.string().nullable(),
  type: TransactionTypeSchema,
});

export type TGetTransactionsList = z.infer<typeof GetTransationsListSchema>;
export const GetTransationsListSchema = z.object({
  account: z
    .object({
      id: z.string().min(1),
      name: z.string().min(1),
      currency: CurrencyCodeSchema,
    })
    .nullable(),
  transactions: z.array(TransactionSchema),
});
