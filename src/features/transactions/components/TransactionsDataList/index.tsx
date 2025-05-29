"use client";

import { Alert, Divider, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { IGroupedTransactionsByDate } from "@/features/transactions/helpers/getGroupedTransactionsByDate";
import { DataItem } from "@/features/transactions/components/TransactionsDataList/DataItem";
import dayjs from "dayjs";

interface IProps {
  list: IGroupedTransactionsByDate[];
}

export function TransactionsDataList({ list }: IProps) {
  const t = useTranslations("Transactions");

  if (list.length === 0) {
    return (
      <Alert variant="light" color="blue">
        {t("dataList.emptyListMessage")}
      </Alert>
    );
  }

  return (
    <Stack gap="sm">
      {list.map((group) => (
        <Stack key={group.date}>
          <Divider variant="dashed" />
          <Text>{dayjs(group.date).format("MMM D")}</Text>
          {group.transactions.map((item) => (
            <DataItem key={item.id} item={item} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
}
