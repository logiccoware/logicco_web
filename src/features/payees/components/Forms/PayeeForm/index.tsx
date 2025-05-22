"use client";

import { TPayeeBase } from "@/features/payees/schema";
import { TextInput } from "@mantine/core";
import { DataActionFooter } from "@/components/ui/Modals/DataActionFooter";

interface IProps {
  payee?: TPayeeBase;
  errors?: Record<string, string> | null;
  formAction: (payload: FormData) => void;
  disabled: boolean;
  DeleteButton?: React.ReactNode;
}

export function PayeeForm({
  errors,
  formAction,
  disabled,
  payee,
  DeleteButton,
}: IProps) {
  return (
    <form action={formAction}>
      <TextInput
        error={errors?.name}
        label="Name"
        placeholder="Name"
        name="name"
        defaultValue={payee?.name}
        size="md"
        required
      />
      {payee?.id ? (
        <TextInput type="hidden" name="payeeId" value={payee.id} />
      ) : null}
      <DataActionFooter
        mode={payee ? "update" : "create"}
        disabled={disabled}
        DeleteButton={DeleteButton}
      />
    </form>
  );
}
