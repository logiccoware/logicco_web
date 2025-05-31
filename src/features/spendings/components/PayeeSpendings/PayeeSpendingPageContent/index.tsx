import { TGetSpendingByPayee } from "@/features/spendings/api/server/fetch/getSpendingByPayee";
import { Group, Stack, Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import { PayeeSpendingTable } from "@/features/spendings/components/PayeeSpendings/PayeeSpendingTable";
import { PieChart } from "@mantine/charts";
import { TransactionTypeFilter } from "@/features/spendings/components/TransactionTypeFilter";
import { PageContentEmpty } from "@/features/spendings/components/PageContentEmpty";

interface IProps {
  data: TGetSpendingByPayee;
}

export async function PayeeSpendingPageContent({ data }: IProps) {
  const t = await getTranslations("Spendings.payees");

  if (data.list.length === 0) {
    return <PageContentEmpty message={t("emptyListMessage")} />;
  }

  return (
    <Stack>
      <PieChart
        data={data.pieChartData}
        withTooltip
        tooltipDataSource="segment"
        mx="auto"
        withLabelsLine
        labelsPosition="inside"
        labelsType="percent"
        withLabels
      />
      <Group justify="space-between">
        <Title order={4}>{t("title")}</Title>
        <TransactionTypeFilter />
      </Group>
      <PayeeSpendingTable spendings={data.list} />
    </Stack>
  );
}
