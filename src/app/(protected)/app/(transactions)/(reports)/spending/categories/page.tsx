import type { Metadata } from "next";
import { Stack } from "@mantine/core";
import { protectAuthRoute } from "@/features/auth/helpers/protectAuthRoute";
import { getSpendingByCategory } from "@/features/spendings/api/server/fetch/getSpendingByCategory";
import { getAccountDefaultSelectedCookie } from "@/features/accounts/api/server/actions/getAccountDefaultSelectedCookie";
import { CategorySpendingPageContent } from "@/features/spendings/components/CategorySpendings/CategorySpendingPageContent";

export const metadata: Metadata = {
  title: "Category Spending | Logicco",
};

export default async function SpendingsCategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string, transactionType?: string }>;
}) {
  await protectAuthRoute();

  const { month, transactionType } = await searchParams;

  const accountDefaultSelectedCookie = await getAccountDefaultSelectedCookie();

  const data = await getSpendingByCategory({
    transactionType,
    month,
    account: accountDefaultSelectedCookie,
  });

  return (
    <Stack>
      <CategorySpendingPageContent data={data} />
    </Stack>
  );
}
