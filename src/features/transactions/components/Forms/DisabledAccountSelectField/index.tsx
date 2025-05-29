"use client";

import {
  TAccountBase,
  TAccountDefaultSelectedCookie,
} from "@/features/accounts/schema";
import { Alert, Select } from "@mantine/core";
import { useTranslations } from "next-intl";
import { use } from "react";

interface IProps {
  error?: string;
  accountDefaultSelectedCookie: Promise<TAccountDefaultSelectedCookie | null>;
  account?: TAccountBase;
}

export function DisabledAccountSelectField({
  accountDefaultSelectedCookie,
  error,
}: IProps) {
  const t = useTranslations("Transactions.form.fields.account");
  const account = use(accountDefaultSelectedCookie);

  if (!account) {
    return <Alert color="red">{t("noDefaultAccountMessage")}</Alert>;
  }

  return (
    <Select
      error={error}
      label={t("label")}
      placeholder={t("placeholder")}
      size="md"
      name="accountId"
      defaultValue={account.id}
      data={[
        {
          value: account.id,
          label: account.name,
        },
      ]}
    />
  );
}
