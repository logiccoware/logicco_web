import type { Metadata } from "next";
import { Center, Group, Stack, Title } from "@mantine/core";
import { protectAuthRoute } from "@/features/auth/helpers/protectAuthRoute";
import { getTransactionsListSchema } from "@/features/transactions/api/server/fetch/getTransactionsList";
import { TransactionCreateButton } from "@/features/transactions/components/TransactionsDataList/TransactionCreateButton";
import { TransactionsDataList } from "@/features/transactions/components/TransactionsDataList";
import { getTranslations } from "next-intl/server";
import { DateMonthSwitcher } from "@/components/layouts/ProtectedLayout/DateMonthSwitcher";

export const metadata: Metadata = {
  title: "Transactions | Logicco",
};

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  await protectAuthRoute();
  const t = await getTranslations("Transactions");

  const { month } = await searchParams;

  const { transactions } = await getTransactionsListSchema({
    queryParams: {
      month,
    },
  });

  return (
    <>
      <Center my="md">
        <DateMonthSwitcher />
      </Center>
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={4}>{t("dataList.title")}</Title>
          <TransactionCreateButton />
        </Group>
        <TransactionsDataList list={transactions} />
      </Stack>
    </>
  );
}
