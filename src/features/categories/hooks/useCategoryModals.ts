import { openContextModal } from "@mantine/modals";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import type { ISelectedCategory } from "@/features/categories/store/stateMachines/types";
import { useDisclosure } from "@mantine/hooks";

export const CATEGORY_MODALS = {
  categoryRootCreateModal: "categoryRootCreateModal",
  categoryLeafCreateModal: "categoryLeafCreateModal",
  categoryUpdateModal: "categoryUpdateModal",
};

interface IReturn {
  openCategoryCreateModal: (selectedCategory?: ISelectedCategory) => void;
  openCategoryUpdateModal: (selectedCategory: ISelectedCategory) => void;
  isDeleteModalOpen: boolean;
  closeCategoryDeleteModal: () => void;
  openCategoryDeleteModal: () => void;
}

export function useCategoryModals(): IReturn {
  const t = useTranslations("Categories");
  const [opened, { open, close }] = useDisclosure(false);

  const openCategoryRootCreateModal = useCallback(() => {
    openContextModal({
      modal: CATEGORY_MODALS.categoryRootCreateModal,
      centered: true,
      title: t("modals.create.title"),
      innerProps: {},
    });
  }, [t]);

  const openCategoryLeafCreateModal = useCallback(
    (selectedCategory: ISelectedCategory) => {
      openContextModal({
        modal: CATEGORY_MODALS.categoryLeafCreateModal,
        centered: true,
        title: t("modals.createLeaf.title"),
        innerProps: {
          selectedCategory,
        },
      });
    },
    [t]
  );

  const openCategoryCreateModal = useCallback(
    (selectedCategory?: ISelectedCategory) => {
      if (selectedCategory && !selectedCategory.parent) {
        openCategoryLeafCreateModal(selectedCategory);
      } else {
        openCategoryRootCreateModal();
      }
    },
    [openCategoryLeafCreateModal, openCategoryRootCreateModal]
  );

  const openCategoryUpdateModal = useCallback(
    (selectedCategory: ISelectedCategory) => {
      openContextModal({
        modal: CATEGORY_MODALS.categoryUpdateModal,
        centered: true,
        title: t("modals.update.title"),
        innerProps: {
          selectedCategory,
        },
      });
    },
    [t]
  );

  return {
    openCategoryCreateModal,
    openCategoryUpdateModal,
    isDeleteModalOpen: opened,
    openCategoryDeleteModal: open,
    closeCategoryDeleteModal: close,
  };
}
