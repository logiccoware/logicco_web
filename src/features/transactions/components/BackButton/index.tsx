"use client";

import { ActionIcon } from "@mantine/core";
import { useTransactionsPageGroupLink } from "@/features/transactions/hooks/useTransactionsPageGroupLink";
import NextLink from "next/link";
import { IconChevronLeft } from "@tabler/icons-react";

export function BackLink() {
  const { getLink } = useTransactionsPageGroupLink();
  return (
    <ActionIcon
      variant="default"
      component={NextLink}
      href={getLink("/app/transactions")}
    >
      <IconChevronLeft />
    </ActionIcon>
  );
}
