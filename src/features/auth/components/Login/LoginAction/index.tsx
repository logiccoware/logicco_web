"use client";

import { loginAction } from "@/app/(public)/login/actions";
import { useActionState } from "react";
import { LoginForm } from "../LoginForm";
import { IFormActionState } from "@/lib/types";
// import { useTranslations } from "next-intl";

const initialState: IFormActionState = {
  success: false,
  error: null,
};

export function LoginAction() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <LoginForm
      formAction={formAction}
      disabled={pending}
      errorMessage={
        state.error?.errors?.unknown ? "Something went wrong" : undefined
      }
    />
  );
}
