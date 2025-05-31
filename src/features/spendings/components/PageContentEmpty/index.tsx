"use client";

import { Alert, Group, Stack } from "@mantine/core";
import { TransactionTypeFilter } from "@/features/spendings/components/TransactionTypeFilter";

interface IProps {
  message?: string;
}

export function PageContentEmpty({ message }: IProps) {
  return (
    <Stack mt="lg">
      <Group justify="flex-end">
        <TransactionTypeFilter />
      </Group>
      <Alert>{message}</Alert>
    </Stack>
  );
}
