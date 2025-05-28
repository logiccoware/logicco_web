import type { Metadata } from "next";
import { Container, Paper, Stack, Title } from "@mantine/core";
import { protectAuthRoute } from "@/features/auth/helpers/protectAuthRoute";
import { getTranslations } from "next-intl/server";
import { TransactionCreate } from "@/features/transactions/components/TransactionCreate";
import { getAccountDefaultSelectedCookie } from "@/features/accounts/helpers/server/getAccountDefaultSelectedCookie";
import { getPayeesList } from "@/features/payees/api/server/fetch/getPayeesList";
import { getCategoryTreeView } from "@/features/categories/api/server/fetch/getCategoryTreeView";

export const metadata: Metadata = {
  title: "Create Transaction | Logicco",
};

export default async function CreateTransactionPage() {
  await protectAuthRoute();
  const t = await getTranslations("Transactions");
  const accountDefaultSelectedCookie = getAccountDefaultSelectedCookie();
  const payeesData = getPayeesList();
  const categoriesData = getCategoryTreeView();
  return (
    <Container size={420} my={40}>
      <Stack ta="center">
        <Title order={3}>{t("create.title")}</Title>
      </Stack>
      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <TransactionCreate
          accountDefaultSelectedCookie={accountDefaultSelectedCookie}
          payeesData={payeesData}
          categoriesData={categoriesData}
        />
      </Paper>
    </Container>
  );
}
