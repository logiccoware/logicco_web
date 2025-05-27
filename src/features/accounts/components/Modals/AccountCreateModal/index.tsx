"use client";

import { ContextModalProps } from "@mantine/modals";
import { useActionState, useEffect } from "react";
import { AccountForm } from "@/features/accounts/components/Forms/AccountForm";
import { IFormActionState } from "@/lib/types";
import accountCreateAction from "@/features/accounts/api/server/actions/accountCreateAction";
import { useSnackbar } from "@/lib/hooks/useSnackbar";
import { useTranslations } from "next-intl";

const initialState: IFormActionState = {
  success: false,
  error: null,
};

export function AccountCreateModal({ context, id }: ContextModalProps) {
  const [state, formAction, pending] = useActionState(
    accountCreateAction,
    initialState
  );

  const t = useTranslations("Accounts");
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
    <AccountForm
      disabled={pending}
      errors={state?.error?.errors}
      formAction={formAction}
    />
  );
}
