'use client';

import { DASHBOARD_ROUTE, HOME_ROUTE } from "@/domain/routes";
import { useAuthUser } from "@/features/User/hooks/useAuthUser";
import { WithChildrenAndClassName } from "@/lib/types";
import classNames from "classnames";
import NextLink from "next/link";

export function NavbarBrand({ children, className }: WithChildrenAndClassName) {
  const { isAuthenticated } = useAuthUser();
  return (
    <NextLink
      href={isAuthenticated ? DASHBOARD_ROUTE : HOME_ROUTE}
      className={classNames("text-xl", className)}
    >
      {children}
    </NextLink>
  );
}
