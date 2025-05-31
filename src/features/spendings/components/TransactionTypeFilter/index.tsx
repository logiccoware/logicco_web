"use client";

import { Select } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getTranslationTypesComboBoxData } from "@/features/transactions/helpers/getTransactionTypesComboBoxData";
import { TRANSACTION_TYPES } from "@/features/transactions/constants";

export function TransactionTypeFilter() {
  const params = useSearchParams();
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const data = getTranslationTypesComboBoxData(t);

  function handleSelectChange(value: string | null) {
    const newParams = new URLSearchParams(params.toString());
    if (value === TRANSACTION_TYPES.EXPENSE) {
      newParams.set("transactionType", TRANSACTION_TYPES.EXPENSE);
    } else if (value === TRANSACTION_TYPES.INCOME) {
      newParams.set("transactionType", TRANSACTION_TYPES.INCOME);
    }
    router.push(`${pathname}?${newParams.toString()}`);
  }

  return (
    <Select
      data={data}
      value={params.get("transactionType") ?? TRANSACTION_TYPES.EXPENSE}
      onChange={(value) => handleSelectChange(value)}
    />
  );
}
