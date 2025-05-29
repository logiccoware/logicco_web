"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface IReturn {
  getLink: (path: string) => string;
}

export function useTransactionsPageGroupLink(): IReturn {
  const searchParams = useSearchParams();

  const getLink = useCallback(
    (path: string) => {
      const params = new URLSearchParams(searchParams.toString());
      return `${path}?${params.toString()}`;
    },
    [searchParams]
  );

  return {
    getLink,
  };
}
