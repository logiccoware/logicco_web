import { openContextModal } from "@mantine/modals";
import { useTranslations } from "next-intl";
import { TPayeeBase } from "../schema";

export const PAYEE_MODALS = {
  payeeCreateModal: "payeeCreateModal",
  payeeUpdateModal: "payeeUpdateModal",
  payeeDeleteModal: "payeeDeleteModal",
};

interface IReturn {
  openPayeeCreateModal: () => void;
  openPayeeUpdateModal: (payee: TPayeeBase) => void;
  openPayeeDeleteModal: (payee: TPayeeBase) => void;
}

export function usePayeeModals(): IReturn {
  const t = useTranslations("Payees");

  function openPayeeCreateModal() {
    openContextModal({
      modal: PAYEE_MODALS.payeeCreateModal,
      centered: true,
      title: t("modals.create.title"),
      innerProps: {},
    });
  }

  function openPayeeUpdateModal(payee: TPayeeBase) {
    openContextModal({
      modal: PAYEE_MODALS.payeeUpdateModal,
      title: t("modals.update.title"),
      centered: true,
      innerProps: {
        payee,
      },
    });
  }

  function openPayeeDeleteModal(payee: TPayeeBase) {
    openContextModal({
      modal: PAYEE_MODALS.payeeDeleteModal,
      title: t("modals.delete.title"),
      centered: true,
      innerProps: {
        payee,
        message: t("modals.delete.message"),
      },
    });
  }

  return {
    openPayeeCreateModal,
    openPayeeUpdateModal,
    openPayeeDeleteModal,
  };
}
