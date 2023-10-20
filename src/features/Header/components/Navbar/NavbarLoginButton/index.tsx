import { LOGIN_ROUTE } from "@/domain/routes";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import NextLink from "next/link";

export function NavbarLoginButton() {
  return (
    <Button variant="outline" size="icon" asChild>
      <NextLink href={LOGIN_ROUTE}>
        <UserCircle size={24} />
      </NextLink>
    </Button>
  );
}
