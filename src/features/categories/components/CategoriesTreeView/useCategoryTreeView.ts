import {
  IUseCategorySelectMachineReturn,
  useCategorySelectMachine,
} from "@/features/categories/store/stateMachines/categorySelectMachine/hooks/useCategorySelectMachine";
import {
  IUseCategoryModalsReturn,
  useCategoryModals,
} from "@/features/categories/hooks/useCategoryModals";
import { IAction } from "@/features/categories/components/CategoriesTreeView/CategoryTreeViewActions";

interface IReturn {
  machine: IUseCategorySelectMachineReturn;
  modals: IUseCategoryModalsReturn;
  actions: {
    addAction?: IAction;
    updateAction?: IAction;
    deleteAction?: IAction;
  };
}

export function useCategoryTreeView(): IReturn {
  const machine = useCategorySelectMachine();
  const modals = useCategoryModals();
  return {
    machine,
    modals,
    actions: {
      addAction: {
        onClick: () => modals.openCategoryCreateModal(machine.selectedCategory),
        disabled: Boolean(machine.selectedCategory?.parent),
      },
      updateAction: machine.selectedCategory
        ? {
            onClick: () =>
              modals.openCategoryUpdateModal(machine.selectedCategory!),
            disabled: false,
          }
        : undefined,
      deleteAction: machine.selectedCategory
        ? {
            onClick: () => modals.openCategoryDeleteModal(),
            disabled: false,
          }
        : undefined,
    },
  };
}
