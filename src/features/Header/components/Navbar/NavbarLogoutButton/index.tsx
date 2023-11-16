"use client";

import { Button } from "@/components/ui/button";
import NextLink from "next/link";
import { LogOut } from "lucide-react";
import { LOGOUT_ROUTE } from "@/domain/routes";

export function NavbarLogoutButton() {
  return (
    <NextLink href={LOGOUT_ROUTE}>
      <Button variant="outline">
        <LogOut size={24} /> Logout
      </Button>
    </NextLink>
  );
}
