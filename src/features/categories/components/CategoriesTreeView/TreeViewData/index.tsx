"use client";

import { Tree, TreeNodeData, UseTreeReturnType } from "@mantine/core";
import classes from "@/features/categories/components/CategoriesTreeView/CategoriesTreeView.module.css";
import { TreeViewNode } from "@/features/categories/components/CategoriesTreeView/TreeViewNode";
import type { TSelectCategoryFunction } from "@/features/categories/types";

interface IProps {
  tree: UseTreeReturnType;
  data: TreeNodeData[];
  selectCategory: TSelectCategoryFunction;
  unSelectCategory: () => void;
}

export function TreeViewData({
  data,
  selectCategory,
  unSelectCategory,
  tree,
}: IProps) {
  function handleSelectNode(node: TreeNodeData | null) {
    if (node) {
      selectCategory(node.value, data);
    } else {
      unSelectCategory();
    }
  }
  return (
    <Tree
      tree={tree}
      classNames={classes}
      data={data}
      renderNode={(payload) => (
        <TreeViewNode
          renderProps={payload}
          handleSelectNode={handleSelectNode}
        />
      )}
    />
  );
}
