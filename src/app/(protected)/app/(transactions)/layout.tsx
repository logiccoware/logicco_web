import { AppTabs } from "@/components/layouts/ProtectedLayout/AppTabs";

export interface IProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: IProps) {
  return (
    <div>
      <AppTabs />
      {children}
    </div>
  );
}
