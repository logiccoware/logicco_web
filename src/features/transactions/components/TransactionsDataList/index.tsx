"use client";

import { Alert, Chip, Group, Paper, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { TTransaction } from "@/features/transactions/schema";
import classes from "@/features/transactions/components/TransactionsDataList/TransactionsDataList.module.css";
import { format } from "date-fns";

interface IProps {
  list: TTransaction[];
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
      {list.map((item) => (
        <Paper
          onClick={() => {
            console.log("Transaction clicked:", item.id);
          }}
          className={classes.item}
          p="sm"
          withBorder
          key={item.id}
        >
          <Group justify="space-between">
            <Stack>
              <Text>{item.amount} - {format(new Date(item.date), "PPP")}</Text>
              <Group>
                <Chip>{item.category}</Chip>
                <Chip>{item.payee}</Chip>
              </Group>
            </Stack>
          </Group>
        </Paper>
      ))}
    </Stack>
  );
}
