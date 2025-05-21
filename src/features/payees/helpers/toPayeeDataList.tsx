import type { IDataListItem } from "@/components/ui/DataList/types";
import type { TPayeeBase } from "@/features/payees/schema";

export function toPayeeDataList(
  payees: TPayeeBase[]
): IDataListItem<TPayeeBase>[] {
  const dataListItems: IDataListItem<TPayeeBase>[] = [];
  payees.forEach((payee) => {
    dataListItems.push({
      id: payee.id,
      primaryText: payee.name,
      data: payee,
    });
  });
  return dataListItems;
}
