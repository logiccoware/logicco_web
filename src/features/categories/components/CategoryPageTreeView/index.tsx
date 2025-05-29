"use client";

import { Group, Stack, useTree, type TreeNodeData } from "@mantine/core";
import { CategoryTreeViewActions } from "@/features/categories/components/CategoriesTreeView/CategoryTreeViewActions";
import { CategoriesTreeView } from "@/features/categories/components/CategoriesTreeView";
import { CategoryDeleteModal } from "@/features/categories/components/Modals/CategoryDeleteModal";
import { useCategorySelectTreeView } from "@/features/categories/hooks/useCategorySelectTreeView";
import { useCategoryModals } from "@/features/categories/hooks/useCategoryModals";

interface IProps {
  data: TreeNodeData[];
}

export function CategoryPageTreeView({ data }: IProps) {
  const { selectCategory, selectedCategory, unSelectCategory } =
    useCategorySelectTreeView({
      defaultSelectedCategory: undefined,
    });
  const {
    openCategoryCreateModal,
    openCategoryDeleteModal,
    openCategoryUpdateModal,
    closeCategoryDeleteModal,
    isDeleteModalOpen,
  } = useCategoryModals();
  const tree = useTree();

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
                    onClick: () => openCategoryUpdateModal(selectedCategory!),
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
        <CategoriesTreeView
          data={data}
          selectCategory={selectCategory}
          tree={tree}
          unSelectCategory={unSelectCategory}
        />
      </Stack>
      {selectedCategory ? (
        <CategoryDeleteModal
          selectedCategory={selectedCategory}
          isDeleteModalOpen={isDeleteModalOpen}
          closeCategoryDeleteModal={closeCategoryDeleteModal}
          unSelectCategory={unSelectCategory}
        />
      ) : null}
    </>
  );
}
