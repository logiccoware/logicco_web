"use client";

import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";

interface IProps {
  disabled?: boolean;
}

export function SaveButton({ disabled }: IProps) {
  const t = useTranslations("Transactions.form");
  return (
    <Button disabled={disabled} type="submit">
      {t("saveButton")}
    </Button>
  );
}
