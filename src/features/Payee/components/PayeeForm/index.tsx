"use client";

import { FormField } from "@/components/Form/FormField";
import { Input } from "@/components/ui/input";
import { FormDialog } from "@/components/Form/FormDialog";
import { PayeeResponse } from "@/domain/payee/models";
import { usePayeeForm } from "@/features/Payee/components/PayeeForm/usePayeeForm";
import { FormFieldError } from "@/components/Form/FormFieldError";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface PayeeFormProps {
  payee?: PayeeResponse;
  handleCloseDialog: () => void;
}

export function PayeeForm({ payee, handleCloseDialog }: PayeeFormProps) {
  const queryClient = useQueryClient();
  const { refresh } = useRouter();
  function handleSuccess() {
    refresh();
    queryClient.invalidateQueries({ queryKey: ["api/payees"] });
    handleCloseDialog();
  }
  const { register, errors, handleSubmit, onSubmitForm, handleDeletePayee } =
    usePayeeForm({ payee, handleSuccess });
  const isEditing = Boolean(payee);
  return (
    <FormDialog
      type={isEditing ? "update" : "create"}
      handleDelete={handleDeletePayee}
      handleSubmit={handleSubmit(onSubmitForm)}
    >
      <FormField label="Name" name="name" className="my-2">
        <Input {...register("name")} type="text" placeholder="Payee Name" />
        <FormFieldError
          className="my-2"
          hasIcon
          message={errors?.name?.message}
        />
      </FormField>
    </FormDialog>
  );
}
