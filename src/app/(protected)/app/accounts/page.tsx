import type { Metadata } from "next";
import { Group, Stack, Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import { protectAuthRoute } from "@/features/auth/helpers/protectAuthRoute";
import { getAccountsList } from "@/features/accounts/api/server/fetch/getAccountsList";
import { AccountCreateButton } from "@/features/accounts/components/AccountsDataList/AccountCreateButton";
import { toAccountsDataList } from "@/features/accounts/helpers/toAccountsDataList";
import { AccountsDataList } from "@/features/accounts/components/AccountsDataList";
import { getAccountDefaultSelectedCookie } from "@/features/accounts/helpers/server/getAccountDefaultSelectedCookie";

export const metadata: Metadata = {
  title: "Accounts | Logicco",
};

export default async function AccountsPage() {
  await protectAuthRoute();
  const t = await getTranslations("Accounts");
  const { accounts } = await getAccountsList();
  const accountDefaultSelectedCookie = await getAccountDefaultSelectedCookie();
  const accountsDataList = toAccountsDataList(
    accounts,
    accountDefaultSelectedCookie
  );
  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={4}>{t("dataList.title")}</Title>
        <AccountCreateButton />
      </Group>
      <AccountsDataList list={accountsDataList} />
    </Stack>
  );
}
