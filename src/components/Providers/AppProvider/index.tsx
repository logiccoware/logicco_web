"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { QueryProvider } from "@/components/Providers/QueryProvider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
