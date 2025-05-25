import { useSelector } from "@xstate/react";
import { CategorySelectMachineContext } from "@/features/categories/store/stateMachines/categorySelectMachine/CategorySelectMachineProvider";
import { useCallback } from "react";
import type { TreeNodeData } from "@mantine/core";
import type {
  ISelectedCategory,
  TSelectCategoryFunction,
} from "@/features/categories/store/stateMachines/types";

interface IReturn {
  selectCategory: TSelectCategoryFunction;
  unSelectCategory: () => void;
  selectedCategory?: ISelectedCategory;
}

export function useCategorySelectMachine(): IReturn {
  const actorRef = CategorySelectMachineContext.useActorRef();

  const selectedCategory = useSelector(
    actorRef,
    (state) => state.context.selectedCategory
  );

  const selectCategory = useCallback(
    (id: string, categoriesTreeViewNodeData: TreeNodeData[]) => {
      actorRef.send({
        type: "SELECT",
        categoryId: id,
        categoriesTreeViewNodeData,
      });
    },
    [actorRef]
  );

  const unSelectCategory = useCallback(() => {
    actorRef.send({ type: "UNSELECT" });
  }, [actorRef]);

  return {
    selectCategory,
    unSelectCategory,
    selectedCategory,
  };
}
