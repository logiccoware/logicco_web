"use client";

import { TGetCategoriesTreeView } from "@/features/categories/api/server/fetch/getCategoryTreeView";
import { CategoryModalContent } from "@/features/categories/components/Modals/CategoryModalContent";
import {
  ISelectedCategory,
  TSelectCategoryFunction,
} from "@/features/categories/types";
import { Button, Group, Modal, Chip, Stack, Text, Alert } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { use } from "react";

interface IProps {
  data: Promise<TGetCategoriesTreeView>;
  error?: string;
  selectedCategory?: ISelectedCategory;
  selectCategory: TSelectCategoryFunction;
  unSelectCategory: () => void;
}

export function CategorySelectField({
  data,
  error,
  selectCategory,
  unSelectCategory,
  selectedCategory,
}: IProps) {
  const t = useTranslations("Transactions.form.fields.category");
  const categoriesData = use(data);
  const [opened, { open, close }] = useDisclosure(false);
  const selectedCategoryLabel = getSelectedCategoryLabel();

  function getSelectedCategoryLabel() {
    if (!selectedCategory) {
      return t("noCategorySelectedMessage");
    }
    const parentName = selectedCategory.parent?.name
      ? `${selectedCategory.parent.name}:`
      : "";
    return `${parentName}${selectedCategory.name} `;
  }

  function handleClose() {
    close();
  }

  return (
    <>
      <Stack gap="xs">
        <Text fw="normal">{t("label")}</Text>
        <Chip
          color="default"
          variant="outline"
          checked={Boolean(selectedCategory)}
          size="md"
          name="categoryId"
          defaultValue={selectedCategory?.id}
          onClick={open}
        >
          {selectedCategoryLabel}
        </Chip>
        {error ? <Alert color="red">{error}</Alert> : null}
      </Stack>

      <Modal
        withCloseButton={false}
        centered
        opened={opened}
        onClose={handleClose}
        title={t("modal.title")}
      >
        <Stack>
          <CategoryModalContent
            selectCategory={selectCategory}
            selectedCategory={selectedCategory}
            unSelectCategory={unSelectCategory}
            data={categoriesData.treeNodeData}
          />
          <Group justify="flex-end">
            <Button
              variant="default"
              disabled={!Boolean(selectedCategory)}
              onClick={handleClose}
            >
              {t("modal.cta")}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
