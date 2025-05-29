"use client";

import { Menu, ActionIcon } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { IconTrash, IconDotsVertical } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

interface IProps {
  transactionId: string;
}

export function DataItemMenu({ transactionId }: IProps) {
  const t = useTranslations("Transactions");

  function openTransactionDeleteModal() {
    openContextModal({
      modal: "transactionDeleteModal",
      title: t("modals.delete.title"),
      centered: true,
      innerProps: {
        transactionId,
        message: t("modals.delete.message"),
      },
    });
  }
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="default">
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={openTransactionDeleteModal}
          color="red"
          leftSection={<IconTrash size={14} />}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
