import { AppHeader } from "@/features/Header/components/AppHeader";
import { AuthUserProvider } from "@/features/User/components/AuthUserProvider";

export default function ProtectedPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthUserProvider pagePermission="protected">
      <AppHeader />
      {children}
    </AuthUserProvider>
  );
}
