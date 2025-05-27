import type { Metadata } from "next";
import { PayeeDataList } from "@/features/payees/components/PayeeDataList";
import { Group, Stack, Title } from "@mantine/core";
import { PayeeCreateButton } from "@/features/payees/components/PayeeDataList/PayeeCreateButton";
import { getTranslations } from "next-intl/server";
import { protectAuthRoute } from "@/features/auth/helpers/protectAuthRoute";
import { getPayeesList } from "@/features/payees/api/server/fetch/getPayeesList";
import { toPayeeDataList } from "@/features/payees/helpers/toPayeeDataList";

export const metadata: Metadata = {
  title: "Payees | Logicco",
};

export default async function PayeesPage() {
  await protectAuthRoute();
  const t = await getTranslations("Payees");
  const { payees } = await getPayeesList();
  const payeesDataList = toPayeeDataList(payees);
  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={4}>{t("dataList.title")}</Title>
        <PayeeCreateButton />
      </Group>
      <PayeeDataList list={payeesDataList} />
    </Stack>
  );
}
