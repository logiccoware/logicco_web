"use client";

import { DataList } from "@/components/ui/DataList";
import { IDataListItem } from "@/components/ui/DataList/types";
import { TPayeeBase } from "@/features/payees/schema";
import { usePayeeModals } from "@/features/payees/hooks/usePayeeModals";
import { Alert } from "@mantine/core";
import { useTranslations } from "next-intl";

interface IProps {
  list: IDataListItem<TPayeeBase>[];
}

export function PayeeDataList({ list }: IProps) {
  const { openPayeeUpdateModal } = usePayeeModals();
  const t = useTranslations("Payees");

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
      onItemClick={(payee) => openPayeeUpdateModal(payee)}
    />
  );
}
