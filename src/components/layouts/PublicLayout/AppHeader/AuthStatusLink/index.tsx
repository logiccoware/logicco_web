'use client';

import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";
import NextLink from "next/link";

export function AuthStatusLink() {
  const t = useTranslations("Common");
  return (
    <Button component={NextLink} href="/app">
      {t("publicLayout.header.links.app")}
    </Button>
  );
}
