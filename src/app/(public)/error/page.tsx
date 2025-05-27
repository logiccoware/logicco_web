"use client";

import { AppErrorUnknown } from "@/components/errors/AppError/AppErrorUnknown";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();
  return <AppErrorUnknown ctaClick={() => router.push("/")} />;
}
