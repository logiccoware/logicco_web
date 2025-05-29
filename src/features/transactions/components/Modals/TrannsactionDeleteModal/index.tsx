"use client";

import { ContextModalProps } from "@mantine/modals";
import { useActionState, useEffect } from "react";
import { IFormActionState } from "@/lib/types";
import { ActionDeleteModal } from "@/components/ui/Modals/ActionDeleteModal";
import transactionDeleteAction from "@/features/transactions/api/server/actions/transactionDeleteAction";
import { useTranslations } from "next-intl";
import { useSnackbar } from "@/lib/hooks/useSnackbar";

const initialState: IFormActionState = {
  success: false,
  error: null,
};

export function TransactionDeleteModal({
  context,
  id,
  innerProps: { transactionId, message },
}: ContextModalProps<{ transactionId: string; message: string }>) {
  const [state, formAction, pending] = useActionState(
    transactionDeleteAction,
    initialState
  );

  const t = useTranslations("Transactions");
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbar();

  useEffect(() => {
    if (state.error?.errors?.unknown) {
      showErrorSnackbar();
    }

    if (state.success) {
      showSuccessSnackbar(t("notifications.deleted"));
      context.closeAll();
    }
  }, [state.success, state.error?.errors.unknown]);

  function closeModal() {
    context.closeModal(id);
  }

  return (
    <ActionDeleteModal
      formAction={formAction}
      disabled={pending}
      message={message}
      closeModal={closeModal}
      entityId={transactionId}
    />
  );
}
