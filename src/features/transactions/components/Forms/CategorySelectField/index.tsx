"use client";

import { TGetCategoriesTreeView } from "@/features/categories/api/server/fetch/getCategoryTreeView";
import { CategoryModalContent } from "@/features/categories/components/Modals/CategoryModalContent";
import {
  ISelectedCategory,
  TSelectCategoryFunction,
} from "@/features/categories/types";
import { Button, Group, Modal, Chip, Stack, Text, Alert } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
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
  const isMobile = useMediaQuery("(max-width: 768px)");

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
        fullScreen={isMobile}
        opened={opened}
        onClose={handleClose}
        title={t("modal.title")}
        styles={{
          body: {
            height: isMobile ? "calc(100vh - 60px)" : "70vh",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Stack style={{ flex: 1, minHeight: 0 }}>
          <CategoryModalContent
            selectCategory={selectCategory}
            selectedCategory={selectedCategory}
            unSelectCategory={unSelectCategory}
            data={categoriesData.treeNodeData}
            footer={
              <Group justify="flex-end">
                <Button
                  variant="default"
                  disabled={!Boolean(selectedCategory)}
                  onClick={handleClose}
                >
                  {t("modal.cta")}
                </Button>
              </Group>
            }
          />
        </Stack>
      </Modal>
    </>
  );
}
