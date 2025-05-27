"use client";

import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";
import NextLink from "next/link";

interface IProps {
  closeDrawer?: () => void;
}

export function AuthStatusLink({ closeDrawer }: IProps) {
  const t = useTranslations("Common");
  return (
    <Button onClick={closeDrawer} component={NextLink} href="/app">
      {t("publicLayout.header.links.app")}
    </Button>
  );
}
