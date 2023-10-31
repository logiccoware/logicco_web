"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/User/hooks/useLogout";
import { LogOut } from "lucide-react";

export function NavbarLogoutButton() {
  const { handleLogout } = useLogout();
  return (
    <Button onClick={handleLogout} variant="outline">
      <LogOut size={24} /> Logout
    </Button>
  );
}
