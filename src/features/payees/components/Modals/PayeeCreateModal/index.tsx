"use client";

import { ContextModalProps } from "@mantine/modals";
import { useActionState, useEffect } from "react";
import { PayeeForm } from "../../Forms/PayeeForm";
import { IFormActionState } from "@/lib/types";
import createPayeeAction from "@/features/payees/api/server/actions/createPayeeAction";
import { useSnackbar } from "@/lib/hooks/useSnackbar";
import { useTranslations } from "next-intl";

const initialState: IFormActionState = {
  success: false,
  error: null,
};

export function PayeeCreateModal({ context, id }: ContextModalProps) {
  const [state, formAction, pending] = useActionState(
    createPayeeAction,
    initialState
  );

  const t = useTranslations("Payees");
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbar();

  useEffect(() => {
    if (state.error?.errors?.unknown) {
      showErrorSnackbar();
    }

    if (state.success) {
      showSuccessSnackbar(t("notifications.created"));
      closeModal();
    }
  }, [state.success, state.error?.errors.unknown]);

  function closeModal() {
    context.closeModal(id);
  }

  return (
    <PayeeForm
      disabled={pending}
      errors={state?.error?.errors}
      formAction={formAction}
    />
  );
}
