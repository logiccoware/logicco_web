"use client";

import { useAuthUser } from "@/features/User/hooks/useAuthUser";
import { NavbarLoginButton } from "@/features/Header/components/Navbar/NavbarLoginButton";
import { NavbarDashboardButton } from "@/features/Header/components/Navbar/NavbarDashboardButton";

export function NavbarItem() {
  const { isUserAuthenticated } = useAuthUser();

  if (isUserAuthenticated) {
    return <NavbarDashboardButton />;
  }

  return <NavbarLoginButton />;
}
