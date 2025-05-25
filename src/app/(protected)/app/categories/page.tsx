import { protectedRoute } from "@/lib/server/helpers/protectedRoute";
import type { Metadata } from "next";
import { getCategoriesTreeView } from "@/features/categories/api/server/fetch/getCategoriesTreeView";
import { Group, Stack, Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import { toTreeViewData } from "@/features/helpers/toTreeViewData";
import { CategoryPageTreeView } from "@/features/categories/components/CategoryPageTreeView";
import { CategorySelectMachineProvider } from "@/features/categories/store/stateMachines/categorySelectMachine/CategorySelectMachineProvider";

export const metadata: Metadata = {
  title: "Categories | Logicco",
};

export default async function Home() {
  const { accessToken } = await protectedRoute();
  const { categories } = await getCategoriesTreeView(accessToken);
  const t = await getTranslations("Categories");
  const treeNodeData = toTreeViewData(categories);
  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={4}>{t("dataList.title")}</Title>
      </Group>
      <CategorySelectMachineProvider>
        <CategoryPageTreeView data={treeNodeData} />
      </CategorySelectMachineProvider>
    </Stack>
  );
}
