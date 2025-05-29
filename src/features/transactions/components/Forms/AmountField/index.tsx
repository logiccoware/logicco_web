"use client";

import { NumberInput } from "@mantine/core";
import { useTranslations } from "next-intl";

interface IProps {
  error?: string;
  amount?: string;
}

export function AmountField({ amount, error }: IProps) {
  const t = useTranslations("Transactions.form.fields.amount");
  return (
    <NumberInput
      error={error}
      label={t("label")}
      placeholder={t("placeholder")}
      defaultValue={amount}
      allowNegative={false}
      inputMode="numeric"
      allowDecimal
      name="amount"
      size="md"
    />
  );
}
