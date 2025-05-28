import { AppTabs } from "@/components/layouts/ProtectedLayout/AppTabs";
import { DateMonthSwitcher } from "@/components/layouts/ProtectedLayout/DateMonthSwitcher";
import { Center } from "@mantine/core";

export interface IProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: IProps) {
  return (
    <div>
      <AppTabs />
      <Center my="md">
        <DateMonthSwitcher />
      </Center>
      {children}
    </div>
  );
}
