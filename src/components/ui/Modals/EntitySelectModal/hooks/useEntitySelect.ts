"use client";

import { IEntitySelectField } from "@/components/ui/EntitySelectField";
import type { TreeNodeData } from "@mantine/core";

import { useState, useCallback } from "react";

interface IProps {
  defaultSelectedEntity?: IEntitySelectField;
}

export function useEntitySelect({ defaultSelectedEntity }: IProps) {
  const [selectedEntity, setSelectedEntity] = useState<
    IEntitySelectField | undefined
  >(defaultSelectedEntity);

  const selectEntity = useCallback((id: string, data: TreeNodeData[]) => {
    let selectedEntity: IEntitySelectField | null = null;

    data.forEach((parentNode) => {
      if (parentNode.value === id) {
        selectedEntity = {
          id: parentNode.value,
          label: parentNode.label as string,
        };
        return;
      }
    });

    if (!selectedEntity) {
      throw new Error("Failed to select entity; Entity not found");
    }

    return setSelectedEntity(selectedEntity);
  }, []);

  const unSelectEntity = useCallback(() => {
    setSelectedEntity(undefined);
  }, []);

  return {
    selectedEntity,
    selectEntity,
    unSelectEntity,
  };
}
