import type { Metadata } from "next";
import { Center, Group, Stack, Title } from "@mantine/core";
import { protectAuthRoute } from "@/features/auth/helpers/protectAuthRoute";
import { getTransactionsList } from "@/features/transactions/api/server/fetch/getTransactionsList";
import { TransactionCreateButton } from "@/features/transactions/components/TransactionsDataList/TransactionCreateButton";
import { TransactionsDataList } from "@/features/transactions/components/TransactionsDataList";
import { getTranslations } from "next-intl/server";
import { DateMonthSwitcher } from "@/components/layouts/ProtectedLayout/DateMonthSwitcher";
import { getGroupedTransactionsByDate } from "@/features/transactions/helpers/getGroupedTransactionsByDate";

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

  const { transactions } = await getTransactionsList({
    queryParams: {
      month,
    },
  });

  const groupedTransactionsByDate = getGroupedTransactionsByDate(transactions);

  return (
    <>
      <Center my="md">
        <DateMonthSwitcher />
      </Center>
      <Stack mb={64} gap="xl">
        <Group justify="space-between">
          <Title order={4}>{t("dataList.title")}</Title>
          <TransactionCreateButton />
        </Group>
        <TransactionsDataList list={groupedTransactionsByDate} />
      </Stack>
    </>
  );
}
