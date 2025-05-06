import { ProtectedLayout } from "@/components/layouts/ProtectedLayout";

export interface IProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: IProps) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
