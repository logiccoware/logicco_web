"use client";

import { Button, Group } from "@mantine/core";
import { useTranslations } from "next-intl";

interface IProps {
  disabled: boolean;
  DeleteButton?: React.ReactNode | null;
}

export function ModalActions({ disabled, DeleteButton }: IProps) {
  const t = useTranslations("Common.forms");
  return (
    <Group justify="flex-end" mt="md">
      {DeleteButton}
      <Button type="submit" disabled={disabled}>
        {t("saveButton")}
      </Button>
    </Group>
  );
}
