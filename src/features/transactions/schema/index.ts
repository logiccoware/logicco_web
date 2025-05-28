import { CurrencyCodeSchema } from "@/features/accounts/schema";
import { z } from "zod";

export type TGetTransaction = z.infer<typeof GetTransactionSchema>;
export const GetTransactionSchema = z.object({
  id: z.string().min(1),
  date: z.string().min(1),
  note: z.string().nullable(),
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
});

export const GetTransactionsListQueryResponseSchema = z.array(
  z.object({
    id: z.string().min(1),
    date: z.string().min(1),
    note: z.string().nullable(),
    created_at: z.string().min(1),
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
