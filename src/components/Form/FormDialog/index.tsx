"use client";

import { Button } from "@/components/ui/button";
import { FormDeleteConfirm } from "@/components/Form/FormDeleteConfirm";
import { useFormDialog } from "@/components/Form/FormDialog/useFormDialog";
import { FormDialogProps } from "@/components/Form/FormDialog/types";

export function FormDialog({
  type,
  children,
  handleDelete,
  handleSubmit,
}: FormDialogProps) {
  const { isDeleteConfirmOpen, handleCancelClick, handleOpenDeleteConfirm } =
    useFormDialog();

  return (
    <form onSubmit={handleSubmit}>
      {children}
      {isDeleteConfirmOpen ? (
        <FormDeleteConfirm
          handleCancel={handleCancelClick}
          handleDelete={handleDelete}
        />
      ) : (
        <div className="flex justify-end gap-2 my-4">
          <Button type="submit">
            {type === "update" ? "Update" : "Create"}
          </Button>
          {type === "update" ? (
            <Button onClick={handleOpenDeleteConfirm} variant="destructive">
              Delete
            </Button>
          ) : null}
        </div>
      )}
    </form>
  );
}
