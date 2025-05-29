"use client";

import {
  ISelectedCategory,
  TSelectCategoryFunction,
} from "@/features/categories/types";
import type { TreeNodeData } from "@mantine/core";

import { useState, useCallback } from "react";

interface IProps {
  defaultSelectedCategory?: ISelectedCategory;
}

export function useCategorySelectTreeView({ defaultSelectedCategory }: IProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    ISelectedCategory | undefined
  >(defaultSelectedCategory);

  const selectCategory: TSelectCategoryFunction = useCallback(
    (id: string, categoriesTreeViewNodeData: TreeNodeData[]) => {
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
              parent: {
                id: parentNode.value,
                name: parentNode.label as string,
              },
            };
            return;
          }
        });
      });

      if (!selectedCategory) {
        throw new Error("Failed to select category; Category not found");
      }

      return setSelectedCategory(selectedCategory);
    },
    []
  );

  const unSelectCategory = useCallback(() => {
    setSelectedCategory(undefined);
  }, []);

  return {
    selectedCategory,
    selectCategory,
    unSelectCategory,
  };
}
