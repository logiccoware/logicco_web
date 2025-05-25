"use client";

import { Stack, TextInput } from "@mantine/core";
import { ModalActions } from "@/components/ui/Modals/ModalActions";
import { useTranslations } from "next-intl";

interface ICategoryFormValues {
  categoryId: string;
  name: string;
  parentCategoryName?: string;
}

interface IProps {
  categoryFormValues?: ICategoryFormValues;
  errors?: Record<string, string> | null;
  formAction: (payload: FormData) => void;
  disabled: boolean;
  DeleteButton?: React.ReactNode;
}

export function CategoryForm({
  errors,
  formAction,
  disabled,
  categoryFormValues,
  DeleteButton,
}: IProps) {
  const t = useTranslations("Categories");
  return (
    <form action={formAction}>
      <Stack>
        {categoryFormValues?.parentCategoryName ? (
          <TextInput
            label={t("form.fields.parentCategory.label")}
            defaultValue={categoryFormValues.parentCategoryName}
            size="md"
            disabled
          />
        ) : null}
        <TextInput
          error={errors?.name}
          label={t("form.fields.name.label")}
          placeholder={t("form.fields.name.placeholder")}
          name="name"
          defaultValue={categoryFormValues?.name}
          size="md"
          required
        />
        {categoryFormValues?.categoryId ? (
          <TextInput
            type="hidden"
            name="categoryId"
            value={categoryFormValues?.categoryId}
          />
        ) : null}
      </Stack>
      <ModalActions disabled={disabled} DeleteButton={DeleteButton} />
    </form>
  );
}
