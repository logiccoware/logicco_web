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
      const path =
        value === "/app/spending" ? "/app/spending/categories" : value;
      router.push(`${path}${queryPart}`);
    }
  };

  return (
    <Tabs
      variant="outline"
      value={pathname.includes("/app/spending") ? "/app/spending" : pathname}
      onChange={handleTabChange}
    >
      <Tabs.List>
        <Tabs.Tab value="/app/overview">Overview</Tabs.Tab>
        <Tabs.Tab value="/app/spending">Spending</Tabs.Tab>
        <Tabs.Tab value="/app/transactions">Transactions</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
