"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PayeeDialogContentProps } from "@/features/Payee/components/PayeeDialogContent/types";

export function PayeeDialogContent({
  children,
  title,
}: PayeeDialogContentProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      {children}
    </DialogContent>
  );
}
