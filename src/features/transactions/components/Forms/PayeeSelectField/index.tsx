"use client";

import { ComboboxItem, Group, Select } from "@mantine/core";
import { AddButton } from "@/features/transactions/components/Forms/PayeeSelectField/AddButton";
import { TGetPayeesList } from "@/features/payees/schema";
import { use } from "react";

interface IProps {
  data: Promise<TGetPayeesList>;
  defaultValue?: string;
}

export function PayeeSelectField({ defaultValue, data }: IProps) {
  const payeeData = use(data);
  const comboBoxData: ComboboxItem[] = payeeData.payees.map((payee) => ({
    value: payee.id,
    label: payee.name,
  }));
  return (
    <Group align="center">
      <Select
        label="Payee"
        placeholder="Select Payee"
        defaultValue={defaultValue}
        searchable
        size="md"
        name="type"
        data={comboBoxData}
      />
      <Group mt="sm">
        <AddButton />
      </Group>
    </Group>
  );
}
