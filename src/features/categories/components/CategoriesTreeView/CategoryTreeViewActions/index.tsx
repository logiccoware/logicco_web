"use client";

import { ISelectedCategory } from "@/features/categories/types";
import { ActionIcon, Group } from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

export interface IAction {
  disabled: boolean;
  onClick: () => void;
}

interface IProps {
  selectedCategory?: ISelectedCategory;
  addAction?: IAction;
  updateAction?: IAction;
  deleteAction?: IAction;
}

export function CategoryTreeViewActions({
  addAction,
  updateAction,
  deleteAction,
}: IProps) {
  return (
    <Group>
      {addAction ? (
        <ActionIcon
          disabled={addAction.disabled}
          onClick={addAction.onClick}
          size="lg"
          variant="default"
          aria-label="Add Category"
        >
          <IconPlus size={24} />
        </ActionIcon>
      ) : null}
      {updateAction ? (
        <ActionIcon
          onClick={updateAction.onClick}
          size="lg"
          variant="default"
          aria-label="Edit Category"
        >
          <IconEdit size={24} />
        </ActionIcon>
      ) : null}
      {deleteAction ? (
        <ActionIcon
          onClick={deleteAction.onClick}
          variant="default"
          size="lg"
          aria-label="Delete Category"
        >
          <IconTrash size={24} />
        </ActionIcon>
      ) : null}
    </Group>
  );
}
