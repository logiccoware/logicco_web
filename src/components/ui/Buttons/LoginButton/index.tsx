"use client";

import { Button } from "@mantine/core";
import { useClerk } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export function LoginButton() {
  const t = useTranslations("Common");
  const { redirectToSignIn } = useClerk();
  return (
    <Button onClick={() => redirectToSignIn()}>
      {t("publicLayout.header.links.signIn")}
    </Button>
  );
}
