"use client";

import { ContextModalProps } from "@mantine/modals";
import { useActionState, useEffect } from "react";
import { IFormActionState } from "@/lib/types";
import { TPayeeBase } from "@/features/payees/schema";
import { ActionDeleteModal } from "@/components/ui/Modals/ActionDeleteModal";
import payeeDeleteAction from "@/features/payees/api/server/actions/payeeDeleteAction";
import { useTranslations } from "next-intl";
import { useSnackbar } from "@/lib/hooks/useSnackbar";

const initialState: IFormActionState = {
  success: false,
  error: null,
};

export function PayeeDeleteModal({
  context,
  id,
  innerProps: { payee, message },
}: ContextModalProps<{ payee: TPayeeBase; message: string }>) {
  const [state, formAction, pending] = useActionState(
    payeeDeleteAction,
    initialState
  );

  const t = useTranslations("Payees");
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
      entityId={payee.id}
    />
  );
}
