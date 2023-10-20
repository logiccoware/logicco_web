import { Navbar } from "@/features/Header/components/Navbar";
import { NavbarLoginButton } from "@/features/Header/components/Navbar/NavbarLoginButton";
import { NavbarDashboardButton } from "@/features/Header/components/Navbar/NavbarDashboardButton";
import { PublicNavbarProps } from "@/features/Header/components/AppHeader/types";
import { getDrawerItem } from "@/features/Header/helpers/getDrawerItem";


export function AppHeader({ user }: PublicNavbarProps) {
  return (
    <Navbar drawerItems={getDrawerItem(user)}>
      {user ? <NavbarDashboardButton /> : <NavbarLoginButton />}
    </Navbar>
  );
}
