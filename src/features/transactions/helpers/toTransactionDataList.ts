import type { IDataListItem } from "@/components/ui/DataList/types";
import type { TTransaction } from "@/features/transactions/schema";

export function toTransactionDataList(
  transactions: TTransaction[]
): IDataListItem<TTransaction>[] {
  const dataListItems: IDataListItem<TTransaction>[] = [];
  transactions.forEach((transaction) => {
    dataListItems.push({
      id: transaction.id,
      primaryText: "Transaction",
      data: transaction,
    });
  });
  return dataListItems;
}
