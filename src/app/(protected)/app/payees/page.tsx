import { protectedRoute } from "@/lib/server/helpers/protectedRoute";
import type { Metadata } from "next";
import { toPayeeDataList } from "@/features/payees/helpers/toPayeeDataList";
import { PayeeDataList } from "@/features/payees/components/PayeeDataList";
import { getPayeesList } from "@/features/payees/api/server/fetch/getPayeesList";
import { Group, Stack, Title } from "@mantine/core";
import { PayeeCreateButton } from "@/features/payees/components/PayeeDataList/PayeeCreateButton";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Payees | Logicco",
};

export default async function Home() {
  const { accessToken } = await protectedRoute();
  const { payees } = await getPayeesList(accessToken);
  const payeeDataList = toPayeeDataList(payees);

  const t = await getTranslations("Payees");
  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={4}>{t("dataList.title")}</Title>
        <PayeeCreateButton />
      </Group>
      <PayeeDataList list={payeeDataList} />
    </Stack>
  );
}
