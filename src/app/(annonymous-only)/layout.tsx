import { AppHeader } from "@/features/Header/components/AppHeader";
import { AuthUserProvider } from "@/features/User/components/AuthUserProvider";

export default function AnnonymousOnlyPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthUserProvider pagePermission="anonymous-only">
      <AppHeader />
      {children}
    </AuthUserProvider>
  );
}
