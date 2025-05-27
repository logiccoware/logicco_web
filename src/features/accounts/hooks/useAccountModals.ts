import { openContextModal } from "@mantine/modals";
import { useTranslations } from "next-intl";
import { TAccountBase } from "@/features/accounts/schema";

export const ACCOUNT_MODALS = {
  accountCreateModal: "accountCreateModal",
  accountUpdateModal: "accountUpdateModal",
  accountDeleteModal: "accountDeleteModal",
};

interface IReturn {
  openAccountCreateModal: () => void;
  openAccountUpdateModal: (account: TAccountBase) => void;
  openAccountDeleteModal: (account: TAccountBase) => void;
}

export function useAccountModals(): IReturn {
  const t = useTranslations("Accounts");

  function openAccountCreateModal() {
    openContextModal({
      modal: ACCOUNT_MODALS.accountCreateModal,
      centered: true,
      title: t("modals.create.title"),
      innerProps: {},
    });
  }

  function openAccountUpdateModal(account: TAccountBase) {
    openContextModal({
      modal: ACCOUNT_MODALS.accountUpdateModal,
      title: t("modals.update.title"),
      centered: true,
      innerProps: {
        account,
      },
    });
  }

  function openAccountDeleteModal(account: TAccountBase) {
    openContextModal({
      modal: ACCOUNT_MODALS.accountDeleteModal,
      title: t("modals.delete.title"),
      centered: true,
      innerProps: {
        account,
        message: t("modals.delete.message"),
      },
    });
  }

  return {
    openAccountCreateModal,
    openAccountDeleteModal,
    openAccountUpdateModal,
  };
}
