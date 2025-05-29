import { protectAuthRoute } from "@/features/auth/helpers/protectAuthRoute";
import { getTranslations } from "next-intl/server";
import { getPayeesList } from "@/features/payees/api/server/fetch/getPayeesList";
import { getCategoryTreeView } from "@/features/categories/api/server/fetch/getCategoryTreeView";
import { getAccountDefaultSelectedCookie } from "@/features/accounts/api/server/actions/getAccountDefaultSelectedCookie";
import transactionUpdateAction from "@/features/transactions/api/server/actions/transactionUpdateAction";
import { TransactionActionModal } from "@/features/transactions/components/Modals/TransactionActionModal";
import { getTransaction } from "@/features/transactions/api/server/fetch/getTransaction";

export default async function CreateTransactionModal({
  params,
}: {
  params: Promise<{ transactionId: string }>;
}) {
  await protectAuthRoute();
  const t = await getTranslations("Transactions.page.update");
  const accountDefaultSelectedCookie = getAccountDefaultSelectedCookie();
  const { transactionId } = await params;

  const transaction = await getTransaction(transactionId);
  const payeesData = getPayeesList();
  const categoriesData = getCategoryTreeView();

  return (
    <TransactionActionModal
      accountDefaultSelectedCookie={accountDefaultSelectedCookie}
      payeesData={payeesData}
      categoriesData={categoriesData}
      transactionFormAction={transactionUpdateAction}
      isOpen={true}
      title={t("title")}
      transaction={transaction}
    />
  );
}
