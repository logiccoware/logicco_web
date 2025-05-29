import { DateInput } from "@mantine/dates";
import { useTranslations } from "next-intl";

interface IProps {
  date?: Date;
  error?: string;
}

export function DateField({ date, error }: IProps) {
  const t = useTranslations("Transactions.form.fields.date");
  return (
    <DateInput
      error={error}
      name="date"
      size="md"
      label={t("label")}
      placeholder={t("placeholder")}
      defaultValue={date}
    />
  );
}
