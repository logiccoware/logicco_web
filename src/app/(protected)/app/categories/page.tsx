import type { Metadata } from "next";
import { Group, Stack, Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import { CategoryPageTreeView } from "@/features/categories/components/CategoryPageTreeView";
import { protectAuthRoute } from "@/features/auth/helpers/protectAuthRoute";
import { getCategoryTreeView } from "@/features/categories/api/server/fetch/getCategoryTreeView";

export const metadata: Metadata = {
  title: "Categories | Logicco",
};

export default async function Home() {
  await protectAuthRoute();
  const t = await getTranslations("Categories");
  const { treeNodeData } = await getCategoryTreeView();
  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Title order={4}>{t("dataList.title")}</Title>
      </Group>
      <CategoryPageTreeView data={treeNodeData} />
    </Stack>
  );
}
