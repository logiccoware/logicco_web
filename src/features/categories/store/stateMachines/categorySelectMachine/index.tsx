import { assign, setup } from "xstate";
import { TreeNodeData } from "@mantine/core";
import type {
  ICategorySelectMachineContext,
  TCategorySelectMachineEvents,
  ISelectedCategory,
} from "@/features/categories/store/stateMachines/types";

function getSelectedCategoryFromCategoryTree(
  id: string,
  categoriesTreeViewNodeData: TreeNodeData[]
): ISelectedCategory {
  let selectedCategory: ISelectedCategory | null = null;

  categoriesTreeViewNodeData.forEach((parentNode) => {
    if (parentNode.value === id) {
      selectedCategory = {
        id: parentNode.value,
        name: parentNode.label as string,
      };
      return;
    }

    parentNode.children?.forEach((childNode) => {
      if (childNode.value === id) {
        selectedCategory = {
          id: childNode.value,
          name: childNode.label as string,
          parent: { id: parentNode.value, name: parentNode.label as string },
        };
        return;
      }
    });
  });

  if (!selectedCategory) {
    throw new Error("Failed to select category; Category not found");
  }

  return selectedCategory;
}

export const categorySelectMachine = setup({
  types: {
    context: {} as ICategorySelectMachineContext,
    events: {} as TCategorySelectMachineEvents,
  },
}).createMachine({
  id: "categorySelectMachine",
  initial: "DEFAULT",
  context: {
    selectedCategory: undefined,
  },
  states: {
    DEFAULT: {
      on: {
        SELECT: {
          actions: assign({
            selectedCategory: ({ event }) =>
              getSelectedCategoryFromCategoryTree(
                event.categoryId,
                event.categoriesTreeViewNodeData
              ),
          }),
        },
        UNSELECT: {
          actions: assign({
            selectedCategory: undefined,
          }),
        },
      },
    },
  },
});
