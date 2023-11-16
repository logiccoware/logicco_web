"use client";

import { useAuthUser } from "@/features/User/hooks/useAuthUser";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/domain/routes";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import NextLink from "next/link";

export function NavbarItem() {
  const { isAuthenticated } = useAuthUser();

  return (
    <Button variant="outline" size="icon" asChild>
      <NextLink href={isAuthenticated ? HOME_ROUTE : LOGIN_ROUTE}>
        <UserCircle size={24} />
      </NextLink>
    </Button>
  );
}
