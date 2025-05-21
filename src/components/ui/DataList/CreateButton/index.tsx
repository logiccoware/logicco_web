"use client";

import { Button } from "@mantine/core";
import { useTranslations } from "next-intl";

interface IProps {
  onClick: () => void;
}

export function CreateButton({ onClick }: IProps) {
  const t = useTranslations("Common");
  return <Button onClick={onClick}>{t("dataList.createButton")}</Button>;
}
