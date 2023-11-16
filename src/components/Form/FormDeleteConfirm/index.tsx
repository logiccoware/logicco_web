import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { FormDeleteConfirmProps } from "@/components/Form/FormDeleteConfirm/types";

export function FormDeleteConfirm({
  handleDelete,
  handleCancel,
}: FormDeleteConfirmProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Confirm Delete</AlertTitle>
      <AlertDescription>Are you sure you want to delete?</AlertDescription>
      <div className="flex mt-2 justify-end gap-2">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button type="button" onClick={handleDelete} variant="destructive">
          Delete
        </Button>
      </div>
    </Alert>
  );
}
