import type { Metadata } from "next";
import { Container, Group, Paper, Stack, Title } from "@mantine/core";
import { protectAuthRoute } from "@/features/auth/helpers/protectAuthRoute";
import { getTranslations } from "next-intl/server";
import { TransactionPageAction } from "@/features/transactions/components/TransactionPageAction";
import { getCategoryTreeView } from "@/features/categories/api/server/fetch/getCategoryTreeView";
import { BackLink } from "@/features/transactions/components/BackButton";
import { getAccountDefaultSelectedCookie } from "@/features/accounts/api/server/actions/getAccountDefaultSelectedCookie";
import transactionCreateAction from "@/features/transactions/api/server/actions/transactionCreateAction";
import { getPayeesTreeNodeData } from "@/features/payees/api/server/fetch/getPayeesTreeNodeData";

export const metadata: Metadata = {
  title: "Create Transaction | Logicco",
};

export default async function CreateTransactionPage() {
  await protectAuthRoute();
  const t = await getTranslations("Transactions");
  const accountDefaultSelectedCookie = getAccountDefaultSelectedCookie();
  const payeesTreeNodeData = getPayeesTreeNodeData();

  const categoriesData = getCategoryTreeView();
  return (
    <Container size={420} my={40}>
      <Stack>
        <Group>
          <BackLink />
          <Title ta="center" order={3}>
            {t("create.title")}
          </Title>
        </Group>
      </Stack>
      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <TransactionPageAction
          payeesTreeNodeData={payeesTreeNodeData}
          categoriesData={categoriesData}
          accountDefaultSelectedCookie={accountDefaultSelectedCookie}
          transactionFormAction={transactionCreateAction}
        />
      </Paper>
    </Container>
  );
}
