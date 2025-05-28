"use client";

import { DateField } from "@/features/transactions/components/Forms/DateField";
import { AmountField } from "@/features/transactions/components/Forms/AmountField";
import { TypeSelectField } from "@/features/transactions/components/Forms/TypeSelectField";
import { DisabledAccountSelectField } from "@/features/transactions/components/Forms/DisabledAccountSelectField";
import { PayeeSelectField } from "@/features/transactions/components/Forms/PayeeSelectField";
import { Suspense } from "react";
import { Stack } from "@mantine/core";
import { TAccountDefaultSelectedCookie } from "@/features/accounts/schema";
import { TGetPayeesList } from "@/features/payees/schema";
import { CategorySelectField } from "@/features/transactions/components/Forms/CategorySelectField";
import { TGetCategoriesTreeView } from "@/features/categories/api/schema";
import { CategorySelectMachineProvider } from "@/features/categories/store/stateMachines/categorySelectMachine/CategorySelectMachineProvider";

interface IProps {
  accountDefaultSelectedCookie: Promise<TAccountDefaultSelectedCookie | null>;
  payeesData: Promise<TGetPayeesList>;
  categoriesData: Promise<TGetCategoriesTreeView>;
}

export function TransactionCreate({
  accountDefaultSelectedCookie,
  payeesData,
  categoriesData,
}: IProps) {
  return (
    <form>
      <Stack>
        <Suspense fallback={<div>Loading account...</div>}>
          <DisabledAccountSelectField
            accountDefaultSelectedCookie={accountDefaultSelectedCookie}
          />
        </Suspense>
        <DateField />
        <AmountField />
        <TypeSelectField />
        <Suspense fallback={<div>Loading payees...</div>}>
          <PayeeSelectField data={payeesData} />
        </Suspense>
        <Suspense fallback={<div>Loading categories...</div>}>
          <CategorySelectMachineProvider>
            <CategorySelectField data={categoriesData} />
          </CategorySelectMachineProvider>
        </Suspense>
      </Stack>
    </form>
  );
}
