"use client";

import type { TreeNodeData, UseTreeReturnType } from "@mantine/core";
import { TreeViewData } from "@/features/categories/components/CategoriesTreeView/TreeViewData";
import type { TSelectCategoryFunction } from "@/features/categories/store/stateMachines/types";

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
  return (
    <TreeViewData
      tree={tree}
      data={data}
      selectCategory={selectCategory}
      unSelectCategory={unSelectCategory}
    />
  );
}
