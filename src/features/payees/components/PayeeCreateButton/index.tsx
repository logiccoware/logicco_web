"use client";

import { CreateButton } from "@/components/ui/DataList/CreateButton";
import { usePayeeModals } from "@/features/payees/hooks/usePayeeModals";

export function PayeeCreateButton() {
  const { openPayeeCreateModal } = usePayeeModals();
  return <CreateButton onClick={openPayeeCreateModal} />;
}
