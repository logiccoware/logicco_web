"use client";

import { Box, ComboboxItem, Flex, Select } from "@mantine/core";
import { AddButton } from "@/features/transactions/components/Forms/PayeeSelectField/AddButton";
import { TGetPayeesList } from "@/features/payees/schema";
import { use } from "react";
import { useTranslations } from "next-intl";

interface IProps {
  data: Promise<TGetPayeesList>;
  defaultValue?: string;
  error?: string;
}

export function PayeeSelectField({ defaultValue, data, error }: IProps) {
  const t = useTranslations("Transactions.form.fields.payee");
  const payeeData = use(data);
  const comboBoxData: ComboboxItem[] = payeeData.payees.map((payee) => ({
    value: payee.id,
    label: payee.name,
  }));
  return (
    <Flex
      gap="sm"
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Select
        flex={1}
        error={error}
        label={t("label")}
        placeholder={t("placeholder")}
        defaultValue={defaultValue}
        searchable
        size="md"
        name="payeeId"
        data={comboBoxData}
      />
      <Box mt="lg">
        <AddButton />
      </Box>
    </Flex>
  );
}
