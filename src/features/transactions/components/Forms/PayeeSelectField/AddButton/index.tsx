"use client";

import { usePayeeModals } from "@/features/payees/hooks/usePayeeModals";
import { ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export function AddButton() {
  const { openPayeeCreateModal } = usePayeeModals();
  return (
    <ActionIcon size={32} onClick={openPayeeCreateModal} variant="default">
      <IconPlus size={24} />
    </ActionIcon>
  );
}
