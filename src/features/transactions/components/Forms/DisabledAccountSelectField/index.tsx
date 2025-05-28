"use client";

import { TAccountDefaultSelectedCookie } from "@/features/accounts/schema";
import { Alert, Select } from "@mantine/core";
import { use } from "react";

interface IProps {
  accountDefaultSelectedCookie: Promise<TAccountDefaultSelectedCookie | null>;
}

export function DisabledAccountSelectField({
  accountDefaultSelectedCookie,
}: IProps) {
  const account = use(accountDefaultSelectedCookie);

  if (!account) {
    return (
      <Alert color="red">No default account found, Please set account</Alert>
    );
  }

  return (
    <Select
      disabled
      label="Account"
      placeholder="Select Account"
      size="md"
      name="type"
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
