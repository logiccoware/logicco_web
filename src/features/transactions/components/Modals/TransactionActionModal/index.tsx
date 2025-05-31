"use client";

import { Modal, Text, TreeNodeData } from "@mantine/core";
import { useRouter } from "next/navigation";
import { TransactionPageAction } from "@/features/transactions/components/TransactionPageAction";
import { TGetCategoriesTreeView } from "@/features/categories/api/server/fetch/getCategoryTreeView";
import { TAccountDefaultSelectedCookie } from "@/features/accounts/schema";
import { IFormActionState } from "@/lib/types";
import { TGetTransaction } from "@/features/transactions/api/server/fetch/getTransaction";
import { useMediaQuery } from "@mantine/hooks";

interface IProps {
  transaction?: TGetTransaction;
  title: string;
  payeesTreeNodeData: Promise<TreeNodeData[]>;
  categoriesData: Promise<TGetCategoriesTreeView>;
  accountDefaultSelectedCookie: Promise<TAccountDefaultSelectedCookie | null>;
  transactionFormAction: (
    prevState: unknown,
    formData: FormData
  ) => Promise<IFormActionState>;
  isOpen: boolean;
}

export function TransactionActionModal({
  title,
  payeesTreeNodeData,
  categoriesData,
  accountDefaultSelectedCookie,
  transactionFormAction,
  isOpen,
  transaction,
}: IProps) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal
      fullScreen={isMobile}
      opened={isOpen}
      onClose={handleClose}
      title={
        <Text size="lg" fw={700}>
          {title}
        </Text>
      }
      size="lg"
    >
      <TransactionPageAction
        payeesTreeNodeData={payeesTreeNodeData}
        categoriesData={categoriesData}
        accountDefaultSelectedCookie={accountDefaultSelectedCookie}
        transactionFormAction={transactionFormAction}
        transaction={transaction}
      />
    </Modal>
  );
}
