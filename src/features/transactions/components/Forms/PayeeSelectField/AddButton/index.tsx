"use client";

import { usePayeeModals } from "@/features/payees/hooks/usePayeeModals";
import { ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export function AddButton() {
  const { openPayeeCreateModal } = usePayeeModals();
  return (
    <ActionIcon onClick={openPayeeCreateModal} variant="default" size="md">
      <IconPlus />
    </ActionIcon>
  );
}
