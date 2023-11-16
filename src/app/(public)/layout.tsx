import { SESSION_COOKIE_NAME } from "@/domain/user/constants";
import { userService } from "@/domain/user/services";
import { AppHeader } from "@/features/Header/components/AppHeader";
import { AuthUserProvider } from "@/features/User/components/AuthUserContext";
import { cookies } from "next/headers";

export default async function PublicPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await userService.getAuthSession(
    cookies().get(SESSION_COOKIE_NAME)?.value
  );

  return (
    <AuthUserProvider user={user}>
      <AppHeader />
      {children}
    </AuthUserProvider>
  );
}
