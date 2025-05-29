"use client";

import { Tabs } from "@mantine/core";
import classes from "@/features/spendings/components/SpendingTabs/SpendingTabs.module.css";
import { usePathname, useRouter } from "next/navigation";
import { useTransactionsPageGroupLink } from "@/features/transactions/hooks/useTransactionsPageGroupLink";

export function SpendingTabs() {
  const router = useRouter();
  const { getLink } = useTransactionsPageGroupLink();
  const pathname = usePathname();
  return (
    <Tabs
      value={pathname}
      onChange={(value) => router.push(getLink(value || "/error"))}
      variant="unstyled"
      defaultValue="settings"
      classNames={classes}
    >
      <Tabs.List grow>
        <Tabs.Tab value={"/app/spending/payees"}>Payees</Tabs.Tab>
        <Tabs.Tab value={"/app/spending/categories"}>Categories</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
