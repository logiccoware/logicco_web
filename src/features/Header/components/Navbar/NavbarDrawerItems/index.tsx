"use client";

import { NavbarDrawerItem } from "@/features/Header/components/Navbar/NavbarDrawerItem";
import { WithClassName } from "@/lib/types";
import { getDrawerItem } from "@/features/Header/helpers/getDrawerItem";
import { useAuthUser } from "@/features/User/hooks/useAuthUser";
import { useMemo } from "react";
import { NavbarLogoutButton } from "@/features/Header/components/Navbar/NavbarLogoutButton";

export function NavbarDrawerItems({ className }: WithClassName) {
  const { isUserAuthenticated } = useAuthUser();
  const drawerItems = useMemo(
    () => getDrawerItem(isUserAuthenticated),
    [isUserAuthenticated]
  );
  return (
    <div className={className}>
      {drawerItems.map(({ href, label, Icon }) => (
        <NavbarDrawerItem key={href} href={href} label={label} Icon={Icon} />
      ))}

      {isUserAuthenticated ? (
        <div>
          <NavbarLogoutButton />
        </div>
      ) : null}
    </div>
  );
}
