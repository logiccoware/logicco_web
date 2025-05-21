"use client";

import { useTranslations } from "next-intl";
import { AppError } from "@/components/errors/AppError";
import { useRouter } from "next/navigation";

export function AppErrorNotFound() {
  const t = useTranslations("Common.errors.notFound");
  const router = useRouter();

  function ctaClick() {
    router.push("/");
  }
  return (
    <AppError
      imageSrc="https://facyxi3alyovytfj.public.blob.vercel-storage.com/img/app/app-not-found-error-3luq8peQckuZe8xBMlnwY2c8M2OOY8.svg"
      title={t("title")}
      description={t("message")}
      ctaButtonText={t("ctaButton")}
      ctaClick={ctaClick}
    />
  );
}
