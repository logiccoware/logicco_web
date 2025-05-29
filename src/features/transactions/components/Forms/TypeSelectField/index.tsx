import { TRANSACTION_TYPES } from "@/features/transactions/constants";
import { getTranslationTypesComboBoxData } from "@/features/transactions/helpers/getTransactionTypesComboBoxData";
import { TTransactionType } from "@/features/transactions/schema";
import { Select } from "@mantine/core";
import { useTranslations } from "next-intl";

interface IProps {
  type?: TTransactionType;
  error?: string;
}

export function TypeSelectField({ type, error }: IProps) {
  const t = useTranslations();
  const data = getTranslationTypesComboBoxData(t);
  return (
    <Select
      error={error}
      label={t("Transactions.form.fields.type.label")}
      placeholder={t("Transactions.form.fields.type.placeholder")}
      defaultValue={type ?? TRANSACTION_TYPES.EXPENSE}
      size="md"
      name="type"
      data={data}
    />
  );
}
