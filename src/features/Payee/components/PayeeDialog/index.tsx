"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PayeeForm } from "@/features/Payee/components/PayeeForm";
import { Plus, PencilIcon } from "lucide-react";
import { PayeeDialogContent } from "@/features/Payee/components/PayeeDialogContent";
import { usePayeeDialog } from "@/features/Payee/components/PayeeDialog/usePayeeDialog";
import type { PayeeDialogProps } from "@/features/Payee/components/PayeeDialog/types";

export function PayeeDialog({ payee }: PayeeDialogProps) {
  const { isPayeeDialogOpen, setIsPayeeDialogOpen, handleCloseDialog } =
    usePayeeDialog();

  return (
    <Dialog open={isPayeeDialogOpen} onOpenChange={setIsPayeeDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          {payee ? <PencilIcon size={18} /> : <Plus size={18} />}
        </Button>
      </DialogTrigger>
      <PayeeDialogContent title={payee ? "Update Payee" : "Create Payee"}>
        <PayeeForm handleCloseDialog={handleCloseDialog} payee={payee} />
      </PayeeDialogContent>
    </Dialog>
  );
}
