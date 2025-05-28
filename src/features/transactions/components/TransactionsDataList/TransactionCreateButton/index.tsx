"use client";

import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";

export function TransactionCreateButton() {
  const t = useTranslations("Common");
  const searchParams = useSearchParams();

  const createLink = () => {
    const params = new URLSearchParams(searchParams.toString());
    return `/app/transactions/create?${params.toString()}`;
  };

  return (
    <Button href={createLink()} component={NextLink}>
      {t("dataList.createButton")}
    </Button>
  );
}
