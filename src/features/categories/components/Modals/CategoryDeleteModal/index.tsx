import { Modal } from "@mantine/core";
import { CategoryDeleteModalContent } from "@/features/categories/components/Modals/CategoryDeleteModal/CategoryDeleteModalContent";
import { useTranslations } from "next-intl";
import type { ISelectedCategory } from "@/features/categories/store/stateMachines/types";

interface IProps {
  isDeleteModalOpen: boolean;
  closeCategoryDeleteModal: () => void;
  selectedCategory: ISelectedCategory;
  unSelectCategory: () => void;
}

export function CategoryDeleteModal({
  isDeleteModalOpen,
  closeCategoryDeleteModal,
  selectedCategory,
  unSelectCategory,
}: IProps) {
  const t = useTranslations("Categories");
  return (
    <Modal
      opened={isDeleteModalOpen}
      onClose={closeCategoryDeleteModal}
      centered
      title={t("modals.delete.title")}
    >
      <CategoryDeleteModalContent
        closeModal={closeCategoryDeleteModal}
        message={t("modals.delete.message")}
        selectedCategory={selectedCategory}
        unSelectCategory={unSelectCategory}
      />
    </Modal>
  );
}
