"use client";

import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";
// import { useRouter } from "next/router";

export function LoginButton() {
  const t = useTranslations("Common");
  // const router = useRouter();
  return (
    <Button onClick={() => {}}>{t("publicLayout.header.links.signIn")}</Button>
  );
}
