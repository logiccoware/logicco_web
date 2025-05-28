"use client";

import { TGetCategoriesTreeView } from "@/features/categories/api/schema";
import { CategoryModalContent } from "@/features/categories/components/Modals/CategoryModalContent";
import { toTreeViewData } from "@/features/categories/helpers/toTreeViewData";
import { useCategorySelectMachine } from "@/features/categories/store/stateMachines/categorySelectMachine/hooks/useCategorySelectMachine";
import { Button, Group, Modal, Chip, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { use } from "react";

interface IProps {
  data: Promise<TGetCategoriesTreeView>;
}

export function CategorySelectField({ data }: IProps) {
  const categoriesData = use(data);
  const categoriesTreeNodeData = toTreeViewData(categoriesData.categories);
  const [opened, { open, close }] = useDisclosure(false);
  const { selectedCategory, unSelectCategory } = useCategorySelectMachine();
  const selectedCategoryLabel = getSelectedCategoryLabel();

  function getSelectedCategoryLabel() {
    if (!selectedCategory) {
      return "No category selected";
    }
    const parentName = selectedCategory.parent?.name
      ? `${selectedCategory.parent.name}:`
      : "";
    return `${parentName}${selectedCategory.name} `;
  }

  function handleSelect() {
    close();
  }

  function handleClose() {
    close();
    unSelectCategory();
  }

  return (
    <>
      <Stack gap="xs">
        <Text fw="normal">Category</Text>
        <Chip
          w={"100%"}
          variant="outline"
          checked={false}
          size="md"
          name="categoryId"
          value={selectedCategory?.id}
          onClick={open}
        >
          {selectedCategoryLabel}
        </Chip>
      </Stack>

      <Modal
        withCloseButton={false}
        closeOnClickOutside={false}
        centered
        opened={opened}
        onClose={handleClose}
        title="Select Category"
      >
        <Stack>
          <CategoryModalContent data={categoriesTreeNodeData} />
          <Group justify="flex-end">
            <Button onClick={handleClose} variant="default">
              Cancel
            </Button>
            <Button disabled={!Boolean(selectedCategory)} onClick={handleSelect}>
              Select
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
