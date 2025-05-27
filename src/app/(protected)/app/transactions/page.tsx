import type { Metadata } from "next";
import { Stack } from "@mantine/core";
import { protectAuthRoute } from "@/features/auth/helpers/protectAuthRoute";
import { getAccountsList } from "@/features/accounts/api/server/fetch/getAccountsList";
import { ComingSoonSection } from "@/components/ui/ComingSoonSection";

export const metadata: Metadata = {
  title: "Transactions | Logicco",
};

export default async function TransactionsPage() {
  await protectAuthRoute();
  await getAccountsList();
  return (
    <Stack gap="md">
      <ComingSoonSection />
    </Stack>
  );
}
