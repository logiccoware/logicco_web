"use client";

import { Alert, Group, Stack, Title } from "@mantine/core";
import { TransactionTypeFilter } from "@/features/spendings/components/TransactionTypeFilter";

interface IProps {
  title: string;
  message: string;
}

export function PageContentEmpty({ message, title }: IProps) {
  return (
    <Stack mt="lg">
      <Group justify="space-between">
        <Title order={4}>{title}</Title>
        <TransactionTypeFilter />
      </Group>
      <Alert>{message}</Alert>
    </Stack>
  );
}
