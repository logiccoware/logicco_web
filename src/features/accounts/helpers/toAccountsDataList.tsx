import type { IDataListItem } from "@/components/ui/DataList/types";
import type {
  TAccountBase,
  TAccountDefaultSelectedCookie,
} from "@/features/accounts/schema";
import { IconCircleDashedCheck } from "@tabler/icons-react";

export function toAccountsDataList(
  accounts: TAccountBase[],
  accountDefaultSelected?: TAccountDefaultSelectedCookie | null
): IDataListItem<TAccountBase>[] {
  const dataListItems: IDataListItem<TAccountBase>[] = [];
  accounts.forEach((account) => {
    dataListItems.push({
      id: account.id,
      primaryText: account.name,
      data: account,
      rightIcon:
        accountDefaultSelected?.id === account.id ? (
          <IconCircleDashedCheck />
        ) : undefined,
    });
  });
  return dataListItems;
}
