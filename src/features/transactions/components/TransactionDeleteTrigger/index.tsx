"use client";

import { ActionDeleteModal } from "@/components/ui/Modals/ActionDeleteModal";
import { FORM_ACTION_INIT_STATE } from "@/lib/constants";
import { ActionIcon, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import transactionDeleteAction from "@/features/transactions/api/server/actions/transactionDeleteAction";
import { useSnackbar } from "@/lib/hooks/useSnackbar";

interface IProps {
  transactionId: string;
}

export function TransactionDeleteTrigger({ transactionId }: IProps) {
  const t = useTranslations("Transactions");
  const [opened, { open, close }] = useDisclosure(false);
  const [state, formAction, pending] = useActionState(
    transactionDeleteAction,
    FORM_ACTION_INIT_STATE
  );
  const { showErrorSnackbar } = useSnackbar();

  useEffect(() => {
    if (state.error?.errors?.unknown) {
      showErrorSnackbar();
    }
  }, [state.success, state.error?.errors.unknown]);

  return (
    <>
      <ActionIcon
        size={32}
        color="red"
        variant="filled"
        aria-label="Delete"
        onClick={open}
      >
        <IconTrash />
      </ActionIcon>
      <Modal
        withCloseButton={false}
        centered
        opened={opened}
        onClose={close}
        title={t("modals.delete.title")}
      >
        <ActionDeleteModal
          formAction={formAction}
          disabled={pending}
          message={t("modals.delete.message")}
          closeModal={close}
          entityId={transactionId}
        />
      </Modal>
    </>
  );
}
