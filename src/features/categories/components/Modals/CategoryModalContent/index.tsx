"use client";

import {
  getTreeExpandedState,
  Group,
  Stack,
  useTree,
  type TreeNodeData,
} from "@mantine/core";
import { CategoryTreeViewActions } from "@/features/categories/components/CategoriesTreeView/CategoryTreeViewActions";
import { CategoriesTreeView } from "@/features/categories/components/CategoriesTreeView";
import { CategoryDeleteModal } from "../CategoryDeleteModal";
import { useCategoryModals } from "@/features/categories/hooks/useCategoryModals";
import { ISelectedCategory, TSelectCategoryFunction } from "@/features/categories/types";

interface IProps {
  selectedCategory?: ISelectedCategory;
  selectCategory: TSelectCategoryFunction;
  unSelectCategory: () => void;
  data: TreeNodeData[];
}

export function CategoryModalContent({
  data,
  selectCategory,
  unSelectCategory,
  selectedCategory,
}: IProps) {
  const {
    openCategoryCreateModal,
    openCategoryUpdateModal,
    closeCategoryDeleteModal,
    isDeleteModalOpen,
  } = useCategoryModals();
  const tree = useTree({
    initialSelectedState: selectedCategory ? [selectedCategory?.id] : [],
    initialExpandedState: getTreeExpandedState(data, "*"),
  });

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
