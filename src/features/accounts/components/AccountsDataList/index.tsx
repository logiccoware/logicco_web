"use client";

import { DataList } from "@/components/ui/DataList";
import { IDataListItem } from "@/components/ui/DataList/types";
import { Alert } from "@mantine/core";
import { useTranslations } from "next-intl";
import { TAccountBase } from "@/features/accounts/schema";
import { useAccountModals } from "@/features/accounts/hooks/useAccountModals";

interface IProps {
  list: IDataListItem<TAccountBase>[];
}

export function AccountsDataList({ list }: IProps) {
  const t = useTranslations("Transactions");

  const { openAccountUpdateModal } = useAccountModals();

  if (list.length === 0) {
    return (
      <Alert variant="light" color="blue">
        {t("dataList.emptyListMessage")}
      </Alert>
    );
  }

  return (
    <DataList
      list={list}
      onItemClick={(account) => openAccountUpdateModal(account)}
    />
  );
}
