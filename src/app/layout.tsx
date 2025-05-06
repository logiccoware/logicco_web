import "@mantine/core/styles.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home | Logicco",
  description: "Simplify tracking your expenses",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <ClerkProvider>
      <html lang={locale} {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript defaultColorScheme="dark" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <NextIntlClientProvider locale={locale}>
            <MantineProvider defaultColorScheme="dark">
              {children}
            </MantineProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
