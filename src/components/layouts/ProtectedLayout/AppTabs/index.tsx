"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs } from "@mantine/core";

export function AppTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();
  const queryPart = queryString ? `?${queryString}` : "";

  const handleTabChange = (value: string | null) => {
    if (value) {
      router.push(`${value}${queryPart}`);
    }
  };

  return (
    <Tabs value={pathname} onChange={handleTabChange}>
      <Tabs.List>
        <Tabs.Tab value="/app/overview">Overview</Tabs.Tab>
        <Tabs.Tab value="/app/spending">Spending</Tabs.Tab>
        <Tabs.Tab value="/app/transactions">Transactions</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
