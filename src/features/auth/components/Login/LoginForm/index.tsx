"use client";

import { Alert, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useTranslations } from "next-intl";

interface IProps {
  errorMessage?: string;
  formAction: (payload: FormData) => void;
  disabled?: boolean;
}

export function LoginForm({ formAction, errorMessage, disabled }: IProps) {
  const t = useTranslations("Auth.login.form");
  return (
    <Stack>
      {errorMessage ? <Alert color="red"> {errorMessage} </Alert> : null}
      <form action={formAction}>
        <TextInput
          label={t("fields.email.label")}
          placeholder={t("fields.email.placeholder")}
          required
          radius="md"
          size="md"
          name="email"
        />
        <PasswordInput
          label={t("fields.password.label")}
          placeholder={t("fields.password.placeholder")}
          required
          mt="md"
          size="md"
          radius="md"
          name="password"
        />
        <Button size="md" disabled={disabled} type="submit" fullWidth mt="xl" radius="md">
          {t("submitButton")}
        </Button>
      </form>
    </Stack>
  );
}
