import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import '@mantine/charts/styles.css';

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ModalsProvider } from "@mantine/modals";
import { PayeeCreateModal } from "@/features/payees/components/Modals/PayeeCreateModal";
import { PayeeUpdateModal } from "@/features/payees/components/Modals/PayeeUpdateModal";
import { PayeeDeleteModal } from "@/features/payees/components/Modals/PayeeDeleteModal";
import { Notifications } from "@mantine/notifications";
import { CategoryRootCreateModal } from "@/features/categories/components/Modals/CategoryRootCreateModal";
import { CategoryLeafCreateModal } from "@/features/categories/components/Modals/CategoryLeafCreateModal";
import { CategoryUpdateModal } from "@/features/categories/components/Modals/CategoryUpdateModal";
import { AccountCreateModal } from "@/features/accounts/components/Modals/AccountCreateModal";
import { AccountUpdateModal } from "@/features/accounts/components/Modals/AccountUpdateModal";
import { AccountDeleteModal } from "@/features/accounts/components/Modals/AccountDeleteModal";
import { TransactionDeleteModal } from "@/features/transactions/components/Modals/TrannsactionDeleteModal";

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

const modals = {
  payeeCreateModal: PayeeCreateModal,
  payeeUpdateModal: PayeeUpdateModal,
  payeeDeleteModal: PayeeDeleteModal,
  categoryRootCreateModal: CategoryRootCreateModal,
  categoryLeafCreateModal: CategoryLeafCreateModal,
  categoryUpdateModal: CategoryUpdateModal,
  accountCreateModal: AccountCreateModal,
  accountUpdateModal: AccountUpdateModal,
  accountDeleteModal: AccountDeleteModal,
  transactionDeleteModal: TransactionDeleteModal,
};

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} {...mantineHtmlProps}>
      <head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider locale={locale}>
          <MantineProvider defaultColorScheme="dark">
            <ModalsProvider modals={modals}>
              <Notifications />
              {children}
              {modal}
            </ModalsProvider>
          </MantineProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
