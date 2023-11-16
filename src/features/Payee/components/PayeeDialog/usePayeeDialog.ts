'use client';

import { useState } from "react";

export function usePayeeDialog() {
  const [isPayeeDialogOpen, setIsPayeeDialogOpen] = useState(false);

  function handleCloseDialog() {
    setIsPayeeDialogOpen(false);
  }

  return {
    isPayeeDialogOpen,
    handleCloseDialog,
    setIsPayeeDialogOpen,
  };
}
