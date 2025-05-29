"use client";

import { Badge, Flex, Group, Paper, Text } from "@mantine/core";
import { TTransaction } from "@/features/transactions/schema";
import classes from "@/features/transactions/components/TransactionsDataList/TransactionsDataList.module.css";
import { useTransactionsPageGroupLink } from "@/features/transactions/hooks/useTransactionsPageGroupLink";
import { IconCategory } from "@tabler/icons-react";
import { DataItemMenu } from "../DataItemMenu";
import { useRouter } from "next/navigation";

interface IProps {
  item: TTransaction;
}

export function DataItem({ item }: IProps) {
  const router = useRouter();
  const { getLink } = useTransactionsPageGroupLink();

  return (
    <Flex
      gap="sm"
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Paper
        onClick={() => router.push(getLink(`/app/transactions/${item.id}`))}
        className={classes.item}
        p="sm"
        flex={1}
        key={item.id}
        radius="md"
        withBorder
      >
        <Group justify="space-between">
          <Badge
            size="lg"
            variant="outline"
            leftSection={<IconCategory size={14} />}
          >
            {item.category}
          </Badge>
          <Text>{item.amount}</Text>
        </Group>
      </Paper>
      <DataItemMenu transactionId={item.id} />
    </Flex>
  );
}
