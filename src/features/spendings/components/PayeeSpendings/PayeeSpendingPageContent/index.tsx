import { TGetSpendingByPayee } from "@/features/spendings/api/server/fetch/getSpendingByPayee";
import { Alert, Group, Stack, Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import { PayeeSpendingTable } from "@/features/spendings/components/PayeeSpendings/PayeeSpendingTable";
import { PieChart } from "@mantine/charts";

interface IProps {
  data: TGetSpendingByPayee;
}

export async function PayeeSpendingPageContent({ data }: IProps) {
  const t = await getTranslations("Spendings.payees");

  if (data.list.length === 0) {
    return <Alert>{t("emptyListMessage")}</Alert>;
  }

  return (
    <Stack>
      <PieChart
        data={data.pieChartData}
        withTooltip
        tooltipDataSource="segment"
        mx="auto"
      />
      <Group justify="space-between">
        <Title order={4}>{t("title")}</Title>
      </Group>
      <PayeeSpendingTable spendings={data.list} />
    </Stack>
  );
}
