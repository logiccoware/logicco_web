"use client";

import { useActionState, useEffect } from "react";
import { IFormActionState } from "@/lib/types";
import { ActionDeleteModal } from "@/components/ui/Modals/ActionDeleteModal";
import categoryDeleteAction from "@/features/categories/api/server/actions/categoryDeleteAction";
import { useTranslations } from "next-intl";
import { useSnackbar } from "@/lib/hooks/useSnackbar";
import { ISelectedCategory } from "@/features/categories/store/stateMachines/types";

interface IProps {
  selectedCategory: ISelectedCategory;
  message: string;
  closeModal: () => void;
  unSelectCategory: () => void;
}

const initialState: IFormActionState = {
  success: false,
  error: null,
};

export function CategoryDeleteModalContent({
  selectedCategory,
  message,
  closeModal,
  unSelectCategory,
}: IProps) {
  const [state, formAction, pending] = useActionState(
    categoryDeleteAction,
    initialState
  );

  const t = useTranslations("Categories");
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbar();

  useEffect(() => {
    if (state.error?.errors?.unknown) {
      showErrorSnackbar();
    }

    if (state.success) {
      showSuccessSnackbar(t("notifications.deleted"));
      unSelectCategory();
      closeModal();
    }
  }, [state.success, state.error?.errors.unknown]);

  return (
    <ActionDeleteModal
      formAction={formAction}
      disabled={pending}
      message={message}
      closeModal={closeModal}
      entityId={selectedCategory.id}
    />
  );
}
