"use client";

import { ContextModalProps } from "@mantine/modals";
import { useActionState, useEffect } from "react";
import { IFormActionState } from "@/lib/types";
import { TAccountBase } from "@/features/accounts/schema";
import { ActionDeleteModal } from "@/components/ui/Modals/ActionDeleteModal";
import accountDeleteAction from "@/features/accounts/api/server/actions/accountDeleteAction";
import { useTranslations } from "next-intl";
import { useSnackbar } from "@/lib/hooks/useSnackbar";

const initialState: IFormActionState = {
  success: false,
  error: null,
};

export function AccountDeleteModal({
  context,
  id,
  innerProps: { account, message },
}: ContextModalProps<{ account: TAccountBase; message: string }>) {
  const [state, formAction, pending] = useActionState(
    accountDeleteAction,
    initialState
  );

  const t = useTranslations("Accounts");
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
      entityId={account.id}
    />
  );
}
