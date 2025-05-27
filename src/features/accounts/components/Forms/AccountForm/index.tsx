"use client";

import { TAccountBase } from "@/features/accounts/schema";
import { TextInput, Select, Stack } from "@mantine/core";
import { ModalActions } from "@/components/ui/Modals/ModalActions";
import { useTranslations } from "next-intl";
import { CURRENCIES } from "@/features/accounts/constants";
import { useAccountDefaultSelect } from "@/features/accounts/hooks/useAccountDefaultSelect";
import { DefaultSelectCheckbox } from "@/features/accounts/components/Forms/DefaultSelectCheckbox";

interface IProps {
  account?: TAccountBase;
  errors?: Record<string, string> | null;
  defaultSelectedAccount?: TAccountBase;
  formAction: (payload: FormData) => void;
  disabled: boolean;
  DefaultSelectCheckbox?: React.ReactNode;
  DeleteButton?: React.ReactNode;
}

export function AccountForm({
  errors,
  formAction,
  disabled,
  account,
  DeleteButton,
}: IProps) {
  const t = useTranslations("Accounts");
  const { defaultSelectedAccount } = useAccountDefaultSelect();
  return (
    <form action={formAction}>
      <Stack>
        <TextInput
          error={errors?.name}
          label={t("form.fields.name.label")}
          placeholder={t("form.fields.name.placeholder")}
          name="name"
          defaultValue={account?.name}
          size="md"
          required
        />
        <Select
          error={errors?.currency}
          label={t("form.fields.currency.label")}
          placeholder={t("form.fields.currency.placeholder")}
          name="currency"
          size="md"
          defaultValue={account?.currency}
          required
          data={CURRENCIES}
        />
        <DefaultSelectCheckbox
          defaultChecked={account?.id === defaultSelectedAccount?.id}
        />
      </Stack>
      {account?.id ? (
        <TextInput type="hidden" name="accountId" value={account.id} />
      ) : null}
      <ModalActions disabled={disabled} DeleteButton={DeleteButton} />
    </form>
  );
}
