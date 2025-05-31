import { Group, Stack, Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import { PieChart } from "@mantine/charts";
import { TGetSpendingByCategory } from "@/features/spendings/api/server/fetch/getSpendingByCategory";
import { CategorySpendingBreakdown } from "../CategorySpendingBreakdown";
import { PageContentEmpty } from "@/features/spendings/components/PageContentEmpty";
import { TransactionTypeFilter } from "@/features/spendings/components/TransactionTypeFilter";

interface IProps {
  data: TGetSpendingByCategory;
}

export async function CategorySpendingPageContent({ data }: IProps) {
  const t = await getTranslations("Spendings.categories");

  if (data.list.length === 0) {
    return (
      <PageContentEmpty title={t("title")} message={t("emptyListMessage")} />
    );
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
        <TransactionTypeFilter />
      </Group>
      <CategorySpendingBreakdown spendings={data.list} />
    </Stack>
  );
}
