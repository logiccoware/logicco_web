"use client";

import { Chip, Stack, Text, Alert, TreeNodeData, useTree } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { use } from "react";
import { EntitySelectModal } from "@/components/ui/Modals/EntitySelectModal";

export interface IEntitySelectField {
  id: string;
  label: string;
}

interface IProps {
  data: Promise<TreeNodeData[]>;
  error?: string;
  modalTitle: string;
  defaultValue?: string;
  formFieldLabel: string;
  formFieldName: string;
  formFieldPlaceHolder: string;
  actionButton?: React.ReactNode;
}

export function EntitySelectField({
  data,
  error,
  formFieldLabel,
  formFieldName,
  formFieldPlaceHolder,
  defaultValue,
  actionButton,
  modalTitle,
}: IProps) {
  const tree = useTree({
    initialCheckedState: defaultValue ? [defaultValue] : [],
  });
  const selectFieldData = use(data);
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const selectedEntityId: string | undefined = tree.checkedState[0];

  const selectedEntityLabel = getSelectedEntityLabel();

  function getSelectedEntityLabel(): string {
    if (!selectedEntityId) {
      return formFieldPlaceHolder;
    }

    const selectedEntity = selectFieldData.find(
      (entity) => entity.value === selectedEntityId
    );

    if (selectedEntity) {
      return selectedEntity.label as string;
    }

    return formFieldPlaceHolder;
  }

  function handleClose() {
    close();
  }

  return (
    <>
      <Stack gap="xs">
        <Text fw="normal">{formFieldLabel}</Text>
        <Chip
          color="default"
          variant="outline"
          checked={Boolean(selectedEntityId)}
          size="md"
          name={formFieldName}
          value={selectedEntityId}
          onClick={open}
        >
          {selectedEntityLabel}
        </Chip>
        {error ? <Alert color="red">{error}</Alert> : null}
      </Stack>
      <EntitySelectModal
        opened={opened}
        handleClose={handleClose}
        isMobile={isMobile}
        title={modalTitle}
        data={selectFieldData}
        tree={tree}
        actionButton={actionButton}
      />
    </>
  );
}
