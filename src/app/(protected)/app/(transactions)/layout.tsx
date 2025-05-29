import { AppTabs } from "@/components/layouts/ProtectedLayout/AppTabs";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AppTabs />
      {children}
    </div>
  );
}
