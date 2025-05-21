"use client";

import { Button, Group } from "@mantine/core";
import { useTranslations } from "next-intl";

interface IProps {
  disabled: boolean;
  mode: "create" | "update";
  DeleteButton?: React.ReactNode | null;
}

export function DataActionFooter({ disabled, DeleteButton, mode }: IProps) {
  const t = useTranslations("Common.forms");
  return (
    <Group justify="flex-end" mt="md">
      {DeleteButton}
      <Button type="submit" disabled={disabled}>
        {mode === "update" ? t("updateButton") : t("createButton")}
      </Button>
    </Group>
  );
}
