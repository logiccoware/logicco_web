import { Button } from "@/components/ui/button";
import { HOME_ROUTE } from "@/domain/routes";
import NextLink from "next/link";

export function NavbarDashboardButton() {
  return (
    <Button asChild>
      <NextLink href={HOME_ROUTE}>Dashboard</NextLink>
    </Button>
  );
}
