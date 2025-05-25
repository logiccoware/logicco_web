"use client";

import {
  Alert,
  Group,
  Modal,
  Stack,
  useTree,
  type TreeNodeData,
} from "@mantine/core";
import { useCategorySelectMachine } from "@/features/categories/store/stateMachines/categorySelectMachine/hooks/useCategorySelectMachine";
import { CategoryTreeViewActions } from "@/features/categories/components/CategoriesTreeView/CategoryTreeViewActions";
import { useCategoryModals } from "@/features/categories/hooks/useCategoryModals";
import { ScrollableTreeView } from "@/features/categories/components/CategoryPageTreeView/_internals/ScrollableTreeView";
import { useTranslations } from "next-intl";
import { CategoryDeleteModalContent } from "@/features/categories/components/Modals/CategoryDeleteModalContent";

interface IProps {
  data: TreeNodeData[];
}

export function CategoryPageTreeView({ data }: IProps) {
  const tree = useTree();

  const t = useTranslations("Categories");

  const { selectCategory, selectedCategory, unSelectCategory } =
    useCategorySelectMachine();

  const {
    openCategoryCreateModal,
    openCategoryUpdateModal,
    openCategoryDeleteModal,
    isDeleteModalOpen,
    closeCategoryDeleteModal,
  } = useCategoryModals();

  return (
    <>
      <Stack>
        <Group justify="flex-end">
          <CategoryTreeViewActions
            selectedCategory={selectedCategory}
            addAction={{
              onClick: () => openCategoryCreateModal(selectedCategory),
              disabled: Boolean(selectedCategory?.parent),
            }}
            updateAction={
              selectedCategory
                ? {
                    onClick: () => openCategoryUpdateModal(selectedCategory),
                    disabled: false,
                  }
                : undefined
            }
            deleteAction={
              selectedCategory
                ? {
                    onClick: () => openCategoryDeleteModal(),
                    disabled: false,
                  }
                : undefined
            }
          />
        </Group>
        {data.length > 0 ? (
          <ScrollableTreeView
            tree={tree}
            data={data}
            selectCategory={selectCategory}
            unSelectCategory={unSelectCategory}
          />
        ) : (
          <Alert variant="light" color="blue">
            {t("dataList.emptyListMessage")}
          </Alert>
        )}
      </Stack>
      {selectedCategory ? (
        <Modal
          opened={isDeleteModalOpen}
          onClose={closeCategoryDeleteModal}
          centered
          title={t("modals.delete.title")}
        >
          <CategoryDeleteModalContent
            closeModal={closeCategoryDeleteModal}
            message={t("modals.delete.message")}
            selectedCategory={selectedCategory}
            unSelectCategory={unSelectCategory}
          />
        </Modal>
      ) : null}
    </>
  );
}
