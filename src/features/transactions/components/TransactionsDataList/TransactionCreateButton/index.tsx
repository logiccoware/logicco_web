"use client";

import { useTransactionsPageGroupLink } from "@/features/transactions/hooks/useTransactionsPageGroupLink";
import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";
import NextLink from "next/link";

export function TransactionCreateButton() {
  const t = useTranslations("Common");
  const { getLink } = useTransactionsPageGroupLink();

  return (
    <Button href={getLink("/app/transactions/create")} component={NextLink}>
      {t("dataList.createButton")}
    </Button>
  );
}
