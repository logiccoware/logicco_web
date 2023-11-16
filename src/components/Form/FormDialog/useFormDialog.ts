import { useState } from "react";

export function useFormDialog() {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  function handleOpenDeleteConfirm() {
    setIsDeleteConfirmOpen(true);
  }

  function handleCancelClick() {
    setIsDeleteConfirmOpen(false);
  }

  return {
    isDeleteConfirmOpen,
    handleOpenDeleteConfirm,
    handleCancelClick,
  };
}
