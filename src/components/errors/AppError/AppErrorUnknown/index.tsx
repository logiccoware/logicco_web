"use client";

import { useTranslations } from "next-intl";
import { AppError } from "..";

interface IProps {
  ctaClick: () => void;
}

export function AppErrorUnknown({ ctaClick }: IProps) {
  const t = useTranslations("Common.errors.unknownError");

  return (
    <AppError
      imageSrc="https://facyxi3alyovytfj.public.blob.vercel-storage.com/app-unkown-error-p7tRVekWUidP6V2OOwQkFXbWqnxoqU.svg"
      title={t("title")}
      description={t("message")}
      ctaButtonText={t("ctaButton")}
      ctaClick={ctaClick}
    />
  );
}
