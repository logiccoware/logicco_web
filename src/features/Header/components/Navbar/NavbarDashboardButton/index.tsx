import { Button } from "@/components/ui/button";
import { DASHBOARD_ROUTE } from "@/domain/routes";
import NextLink from "next/link";

export function NavbarDashboardButton() {
  return (
    <Button asChild>
      <NextLink href={DASHBOARD_ROUTE}>Dashboard</NextLink>
    </Button>
  );
}
