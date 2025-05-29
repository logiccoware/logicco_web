"use client";

import { ContextModalProps } from "@mantine/modals";
import { useActionState, useEffect } from "react";
import { CategoryForm } from "@/features/categories/components/Forms/CategoryForm";
import { IFormActionState } from "@/lib/types";
import categoryUpdateAction from "@/features/categories/api/server/actions/categoryUpdateAction";
import { useSnackbar } from "@/lib/hooks/useSnackbar";
import { useTranslations } from "next-intl";
import { ISelectedCategory } from "@/features/categories/types";

const initialState: IFormActionState = {
  success: false,
  error: null,
};

export function CategoryUpdateModal({
  context,
  id,
  innerProps: { selectedCategory },
}: ContextModalProps<{
  selectedCategory: ISelectedCategory;
}>) {
  const [state, formAction, pending] = useActionState(
    categoryUpdateAction,
    initialState
  );

  const t = useTranslations("Categories");
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
    <CategoryForm
      disabled={pending}
      errors={state?.error?.errors}
      formAction={formAction}
      categoryFormValues={{
        name: selectedCategory.name,
        categoryId: selectedCategory.id,
        parentCategoryName: selectedCategory?.parent?.name,
      }}
    />
  );
}
