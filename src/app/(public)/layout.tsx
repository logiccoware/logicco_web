import { AppHeader } from "@/features/Header/components/AppHeader";
import { AuthUserProvider } from "@/features/User/components/AuthUserProvider";

export default function PublicPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthUserProvider pagePermission="public">
      <AppHeader />
      {children}
    </AuthUserProvider>
  );
}
