import type { TreeNodeData } from "@mantine/core";

export interface ICategorySelectMachineContext {
  selectedCategory?: ISelectedCategory;
}

export interface ICategorySelectMachineInput {
  categoriesTreeViewNodeData: TreeNodeData[];
}

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

export type TCategorySelectMachineEvents =
  | {
      type: "SELECT";
      categoriesTreeViewNodeData: TreeNodeData[];
      categoryId: string;
    }
  | {
      type: "UNSELECT";
    };
