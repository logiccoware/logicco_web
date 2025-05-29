"use client";

import {
  Box,
  getTreeExpandedState,
  Group,
  Stack,
  useTree,
  type TreeNodeData,
  ScrollArea,
} from "@mantine/core";
import { CategoryTreeViewActions } from "@/features/categories/components/CategoriesTreeView/CategoryTreeViewActions";
import { CategoriesTreeView } from "@/features/categories/components/CategoriesTreeView";
import { CategoryDeleteModal } from "../CategoryDeleteModal";
import { useCategoryModals } from "@/features/categories/hooks/useCategoryModals";
import {
  ISelectedCategory,
  TSelectCategoryFunction,
} from "@/features/categories/types";

interface IProps {
  selectedCategory?: ISelectedCategory;
  selectCategory: TSelectCategoryFunction;
  unSelectCategory: () => void;
  data: TreeNodeData[];
  footer: React.ReactNode;
}

export function CategoryModalContent({
  data,
  selectCategory,
  unSelectCategory,
  selectedCategory,
  footer,
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
      <Stack h="100%" gap="xs">
        {/* Sticky header */}
        <Box>
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
        </Box>

        {/* scrollable content */}
        <ScrollArea style={{ flex: 1 }}>
          <CategoriesTreeView
            data={data}
            selectCategory={selectCategory}
            tree={tree}
            unSelectCategory={unSelectCategory}
          />
        </ScrollArea>

        {/* Sticky footer */}
        <Box>{footer}</Box>
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
