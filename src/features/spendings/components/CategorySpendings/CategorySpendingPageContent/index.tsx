import { Alert, Group, Stack, Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import { PieChart } from "@mantine/charts";
import { TGetSpendingByCategory } from "@/features/spendings/api/server/fetch/getSpendingByCategory";
import { CategorySpendingBreakdown } from "../CategorySpendingBreakdown";

interface IProps {
  data: TGetSpendingByCategory;
}

export async function CategorySpendingPageContent({ data }: IProps) {
  const t = await getTranslations("Spendings.categories");

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
      <CategorySpendingBreakdown spendings={data.list} />
    </Stack>
  );
}
