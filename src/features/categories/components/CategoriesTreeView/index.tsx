"use client";

import {
  Alert,
  Card,
  type TreeNodeData,
  type UseTreeReturnType,
} from "@mantine/core";
import { TreeViewData } from "@/features/categories/components/CategoriesTreeView/TreeViewData";
import type { TSelectCategoryFunction } from "@/features/categories/store/stateMachines/types";
import { useTranslations } from "next-intl";

interface IProps {
  tree: UseTreeReturnType;
  data: TreeNodeData[];
  selectCategory: TSelectCategoryFunction;
  unSelectCategory: () => void;
}

export function CategoriesTreeView({
  data,
  selectCategory,
  tree,
  unSelectCategory,
}: IProps) {
  const t = useTranslations("Categories");

  if (data.length === 0) {
    return (
      <Alert variant="light" color="blue">
        {t("dataList.emptyListMessage")}
      </Alert>
    );
  }

  return (
    <Card h={"100%"}>
      <TreeViewData
        tree={tree}
        data={data}
        selectCategory={selectCategory}
        unSelectCategory={unSelectCategory}
      />
    </Card>
  );
}
