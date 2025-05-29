import type { Metadata } from "next";
import { Container, Group, Paper, Stack, Title } from "@mantine/core";
import { protectAuthRoute } from "@/features/auth/helpers/protectAuthRoute";
import { getTranslations } from "next-intl/server";
import { getTransaction } from "@/features/transactions/api/server/fetch/getTransaction";
import { TransactionPageAction } from "@/features/transactions/components/TransactionPageAction";
import { getPayeesList } from "@/features/payees/api/server/fetch/getPayeesList";
import { getCategoryTreeView } from "@/features/categories/api/server/fetch/getCategoryTreeView";
import { getAccountDefaultSelectedCookie } from "@/features/accounts/api/server/actions/getAccountDefaultSelectedCookie";
import { BackLink } from "@/features/transactions/components/BackButton";
import transactionUpdateAction from "@/features/transactions/api/server/actions/transactionUpdateAction";

export const metadata: Metadata = {
  title: "Create Transaction | Logicco",
};

export default async function UpdateTransactionPage({
  params,
}: {
  params: Promise<{ transactionId: string }>;
}) {
  await protectAuthRoute();
  const t = await getTranslations("Transactions.page.update");
  const accountDefaultSelectedCookie = getAccountDefaultSelectedCookie();
  const { transactionId } = await params;

  const transaction = await getTransaction(transactionId);
  const payeesData = getPayeesList();
  const categoriesData = getCategoryTreeView();

  return (
    <Container size={420} my={40}>
      <Stack>
        <Group>
          <BackLink />
          <Title ta="center" order={3}>
            {t("title")}
          </Title>
        </Group>
      </Stack>
      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <TransactionPageAction
          transaction={transaction}
          payeesData={payeesData}
          categoriesData={categoriesData}
          accountDefaultSelectedCookie={accountDefaultSelectedCookie}
          transactionFormAction={transactionUpdateAction}
        />
      </Paper>
    </Container>
  );
}
