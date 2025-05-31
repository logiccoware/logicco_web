"use client";

import { useTransactionsPageGroupLink } from "@/features/transactions/hooks/useTransactionsPageGroupLink";
import { ActionIcon, Affix, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";

export function TransactionCreateButton() {
  const t = useTranslations("Common");
  const { getLink } = useTransactionsPageGroupLink();

  const href = getLink("/app/transactions/create");

  return (
    <>
      <Button visibleFrom="md" href={href} component={NextLink}>
        {t("dataList.createButton")}
      </Button>
      <Affix hiddenFrom="md" position={{ bottom: 20, right: 20 }}>
        <ActionIcon
          href={href}
          component={NextLink}
          color="blue"
          radius="xl"
          size={60}
        >
          <IconPlus stroke={1.5} size={30} />
        </ActionIcon>
      </Affix>
    </>
  );
}
