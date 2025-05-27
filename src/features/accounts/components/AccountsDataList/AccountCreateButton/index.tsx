"use client";

import { CreateButton } from "@/components/ui/DataList/CreateButton";
import { useAccountModals } from "@/features/accounts/hooks/useAccountModals";

export function AccountCreateButton() {
  const { openAccountCreateModal } = useAccountModals();
  return <CreateButton onClick={openAccountCreateModal} />;
}
