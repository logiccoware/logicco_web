"use client";

import { ContextModalProps } from "@mantine/modals";
import { useActionState, useEffect } from "react";
import { PayeeForm } from "../../Forms/PayeeForm";
import { IFormActionState } from "@/lib/types";
import payeeUpdateAction from "@/features/payees/api/server/actions/payeeUpdateAction";
import { TPayeeBase } from "@/features/payees/schema";
import { ActionDeleteModalTrigger } from "@/components/ui/Modals/ActionDeleteModal/shared/ActionDeleteModalTrigger";
import { usePayeeModals } from "@/features/payees/hooks/usePayeeModals";
import { useSnackbar } from "@/lib/hooks/useSnackbar";
import { useTranslations } from "next-intl";

const initialState: IFormActionState = {
  success: false,
  error: null,
};

export function PayeeUpdateModal({
  context,
  id,
  innerProps: { payee },
}: ContextModalProps<{ payee: TPayeeBase }>) {
  const [state, formAction, pending] = useActionState(
    payeeUpdateAction,
    initialState
  );
  const t = useTranslations("Payees");
  const { openPayeeDeleteModal } = usePayeeModals();
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
    <PayeeForm
      payee={payee}
      disabled={pending}
      errors={state?.error?.errors}
      formAction={formAction}
      DeleteButton={
        <ActionDeleteModalTrigger
          handleClick={() => openPayeeDeleteModal(payee)}
        />
      }
    />
  );
}
