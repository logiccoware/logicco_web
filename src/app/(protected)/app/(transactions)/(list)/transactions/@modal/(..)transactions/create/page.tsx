import { protectAuthRoute } from "@/features/auth/helpers/protectAuthRoute";
import { getTranslations } from "next-intl/server";
import { getPayeesList } from "@/features/payees/api/server/fetch/getPayeesList";
import { getCategoryTreeView } from "@/features/categories/api/server/fetch/getCategoryTreeView";
import { getAccountDefaultSelectedCookie } from "@/features/accounts/api/server/actions/getAccountDefaultSelectedCookie";
import transactionCreateAction from "@/features/transactions/api/server/actions/transactionCreateAction";
import { TransactionActionModal } from "@/features/transactions/components/Modals/TransactionActionModal";

export default async function CreateTransactionModal() {
  await protectAuthRoute();
  const t = await getTranslations("Transactions.modals.create");
  const accountDefaultSelectedCookie = getAccountDefaultSelectedCookie();
  const payeesData = getPayeesList();
  const categoriesData = getCategoryTreeView();

  return (
    <TransactionActionModal
      accountDefaultSelectedCookie={accountDefaultSelectedCookie}
      payeesData={payeesData}
      categoriesData={categoriesData}
      transactionFormAction={transactionCreateAction}
      isOpen={true}
      title={t("title")}
    />
  );
}
