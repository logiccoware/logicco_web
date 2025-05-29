import type { TreeNodeData } from "@mantine/core";

export type TSelectCategoryFunction = (
  id: string,
  categoriesTreeViewNodeData: TreeNodeData[]
) => void;

export interface ISelectedCategory {
  id: string;
  name: string;
  parent?: {
    id: string;
    name: string;
  };
}
