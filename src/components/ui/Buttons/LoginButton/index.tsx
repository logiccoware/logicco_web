"use client";

import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";

export function LoginButton() {
  const t = useTranslations("Common");
  return (
    <Button onClick={() => {}}>{t("publicLayout.header.links.signIn")}</Button>
  );
}
