import { TreeNodeData } from "@mantine/core";
import { TCategoryTree } from "@/features/categories/api/schema";

export function toTreeViewData(categories: TCategoryTree[]): TreeNodeData[] {
  return categories.map((category) => ({
    label: category.name,
    value: category.id,
    children: category.children
      ? category.children.map((child) => ({
          label: child.name,
          value: child.id,
        }))
      : [],
  }));
}
