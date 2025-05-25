"use client";

import { ContextModalProps } from "@mantine/modals";
import { useActionState, useEffect } from "react";
import { CategoryForm } from "@/features/categories/components/Forms/CategoryForm";
import { IFormActionState } from "@/lib/types";
import categoryRootCreateAction from "@/features/categories/api/server/actions/categoryRootCreateAction";
import { useSnackbar } from "@/lib/hooks/useSnackbar";
import { useTranslations } from "next-intl";

const initialState: IFormActionState = {
  success: false,
  error: null,
};

export function CategoryRootCreateModal({ context, id }: ContextModalProps) {
  const [state, formAction, pending] = useActionState(
    categoryRootCreateAction,
    initialState
  );

  const t = useTranslations("Categories");
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
    <CategoryForm
      disabled={pending}
      errors={state?.error?.errors}
      formAction={formAction}
    />
  );
}
