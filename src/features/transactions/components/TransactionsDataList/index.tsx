"use client";

import { Alert, Badge, Group, Paper, Stack, Text } from "@mantine/core";
import { useTranslations } from "next-intl";
import { TTransaction } from "@/features/transactions/schema";
import classes from "@/features/transactions/components/TransactionsDataList/TransactionsDataList.module.css";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useTransactionsPageGroupLink } from "@/features/transactions/hooks/useTransactionsPageGroupLink";
import { IconCategory, IconUserSquareRounded } from "@tabler/icons-react";

interface IProps {
  list: TTransaction[];
}

export function TransactionsDataList({ list }: IProps) {
  const t = useTranslations("Transactions");
  const router = useRouter();
  const { getLink } = useTransactionsPageGroupLink();

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
            router.push(getLink(`/app/transactions/${item.id}`));
          }}
          className={classes.item}
          p="sm"
          withBorder
          key={item.id}
        >
          <Group justify="space-between">
            <Stack>
              <Text>
                {item.amount} - {dayjs(new Date(item.date)).format("MMM D")}
              </Text>
              <Group>
                <Badge
                  size="lg"
                  variant="outline"
                  leftSection={<IconCategory size={14} />}
                >
                  {item.category}
                </Badge>
                <Badge
                  size="lg"
                  variant="outline"
                  leftSection={<IconUserSquareRounded size={14} />}
                >
                  {item.payee}
                </Badge>
              </Group>
            </Stack>
          </Group>
        </Paper>
      ))}
    </Stack>
  );
}
