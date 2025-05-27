import type { Metadata } from "next";
import { Group, Stack, Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import { CategoryPageTreeView } from "@/features/categories/components/CategoryPageTreeView";
import { CategorySelectMachineProvider } from "@/features/categories/store/stateMachines/categorySelectMachine/CategorySelectMachineProvider";
import { protectAuthRoute } from "@/features/auth/helpers/protectAuthRoute";
import { getCategoryTreeView } from "@/features/categories/api/server/fetch/getCategoryTreeView";
import { toTreeViewData } from "@/features/helpers/toTreeViewData";

export const metadata: Metadata = {
  title: "Categories | Logicco",
};

export default async function Home() {
  await protectAuthRoute();
  const t = await getTranslations("Categories");
  const data = await getCategoryTreeView();
  const treeNodeData = toTreeViewData(data.categories);

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
