import { LOGIN_ROUTE } from "@/domain/routes";
import { userService } from "@/domain/user/services";
import { AppHeader } from "@/features/Header/components/AppHeader";
import { redirect } from "next/navigation";
import { AuthUserProvider } from "@/features/User/components/AuthUserContext";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/domain/user/constants";

export default async function ProtectedPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await userService.getAuthSession(
     cookies().get(SESSION_COOKIE_NAME)?.value
  );

  if (!user) {
    redirect(LOGIN_ROUTE);
  }

  return (
    <AuthUserProvider user={user}>
      <AppHeader />
      {children}
    </AuthUserProvider>
  );
}
