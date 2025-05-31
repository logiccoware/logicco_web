import type { Metadata } from "next";
import { Stack } from "@mantine/core";
import { protectAuthRoute } from "@/features/auth/helpers/protectAuthRoute";
import { getSpendingByPayee } from "@/features/spendings/api/server/fetch/getSpendingByPayee";
import { getAccountDefaultSelectedCookie } from "@/features/accounts/api/server/actions/getAccountDefaultSelectedCookie";
import { PayeeSpendingPageContent } from "@/features/spendings/components/PayeeSpendings/PayeeSpendingPageContent";

export const metadata: Metadata = {
  title: "Payee Spendings | Logicco",
};

export default async function SpendingsPayeesPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; transactionType?: string }>;
}) {
  await protectAuthRoute();

  const { month, transactionType } = await searchParams;

  const accountDefaultSelectedCookie = await getAccountDefaultSelectedCookie();

  const data = await getSpendingByPayee({
    transactionType,
    month,
    account: accountDefaultSelectedCookie,
  });

  return (
    <Stack>
      <PayeeSpendingPageContent data={data} />
    </Stack>
  );
}
