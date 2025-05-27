"use client";

import { ContextModalProps } from "@mantine/modals";
import { useActionState, useEffect } from "react";
import { AccountForm } from "@/features/accounts/components/Forms/AccountForm";
import { IFormActionState } from "@/lib/types";
import accountUpdateAction from "@/features/accounts/api/server/actions/accountUpdateAction";
import { TAccountBase } from "@/features/accounts/schema";
import { ActionDeleteModalTrigger } from "@/components/ui/Modals/ActionDeleteModal/shared/ActionDeleteModalTrigger";
import { useSnackbar } from "@/lib/hooks/useSnackbar";
import { useTranslations } from "next-intl";
import { useAccountModals } from "@/features/accounts/hooks/useAccountModals";

const initialState: IFormActionState = {
  success: false,
  error: null,
};

export function AccountUpdateModal({
  context,
  id,
  innerProps: { account },
}: ContextModalProps<{ account: TAccountBase }>) {
  const [state, formAction, pending] = useActionState(
    accountUpdateAction,
    initialState
  );
  const t = useTranslations("Accounts");
  const { openAccountDeleteModal } = useAccountModals();
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbar();

  useEffect(() => {
    if (state.error?.errors?.unknown) {
      showErrorSnackbar();
    }

    if (state.success) {
      showSuccessSnackbar(t("notifications.updated"));
      closeModal();
    }
  }, [state.success, state.error?.errors.unknown]);

  function closeModal() {
    context.closeModal(id);
  }

  return (
    <AccountForm
      account={account}
      disabled={pending}
      errors={state?.error?.errors}
      formAction={formAction}
      DeleteButton={
        <ActionDeleteModalTrigger
          handleClick={() => openAccountDeleteModal(account)}
        />
      }
    />
  );
}
