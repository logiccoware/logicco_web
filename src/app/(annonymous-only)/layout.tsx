import { DASHBOARD_ROUTE } from "@/domain/routes";
import { SESSION_COOKIE_NAME } from "@/domain/user/constants";
import { userService } from "@/domain/user/services";
import { AppHeader } from "@/features/Header/components/AppHeader";
import { AuthUserProvider } from "@/features/User/components/AuthUserContext";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AnnonymousOnlyPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await userService.getAuthSession(
    cookies().get(SESSION_COOKIE_NAME)?.value
  );

  if (user) {
    return redirect(DASHBOARD_ROUTE);
  }

  return (
    <AuthUserProvider user={user}>
      <AppHeader />
      {children}
    </AuthUserProvider>
  );
}
