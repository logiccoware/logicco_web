import { Textarea } from "@mantine/core";
import { useTranslations } from "next-intl";

interface IProps {
  note?: string | null;
  error?: string;
}

export function NoteField({ note, error }: IProps) {
  const t = useTranslations("Transactions.form.fields.note");
  return (
    <Textarea
      error={error}
      name="note"
      size="md"
      label={t("label")}
      placeholder={t("placeholder")}
      defaultValue={note ?? ""}
    />
  );
}
