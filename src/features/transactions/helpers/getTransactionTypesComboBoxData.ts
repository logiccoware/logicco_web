import { ComboboxData } from "@mantine/core";
import { TRANSACTION_TYPES } from "../constants";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function getTranslationTypesComboBoxData(t: Function): ComboboxData {
  return [
    {
      value: TRANSACTION_TYPES.INCOME,
      label: t("Transactions.form.fields.type.comboBox.income"),
    },
    {
      value: TRANSACTION_TYPES.EXPENSE,
      label: t("Transactions.form.fields.type.comboBox.expense"),
    },
  ];
}
