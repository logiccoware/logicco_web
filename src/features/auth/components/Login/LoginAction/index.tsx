"use client";

import { loginAction } from "@/features/auth/api/server/actions/loginAction";
import { useActionState } from "react";
import { LoginForm } from "@/features/auth/components/Login/LoginForm";
import { IFormActionState } from "@/lib/types";
import { useTranslations } from "next-intl";

const initialState: IFormActionState = {
  success: false,
  error: null,
};

export function LoginAction() {
  const t = useTranslations("Auth.login.form");

  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <LoginForm
      formAction={formAction}
      disabled={pending}
      errorMessage={
        state.error?.errors?.unknown ? t('errorMessage') : undefined
      }
    />
  );
}
