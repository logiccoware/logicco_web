import { ReactNode } from "react";
import { DateMonthSwitcher } from "@/components/layouts/ProtectedLayout/DateMonthSwitcher";
import { Center, Stack } from "@mantine/core";
import { SpendingTabs } from "@/features/spendings/components/SpendingTabs";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Center my='lg'>
        <Stack gap='lg'>
          <DateMonthSwitcher />
          <SpendingTabs />
        </Stack>
      </Center>
      {children}
    </>
  );
}
