import { Navbar } from "@/features/Header/components/Navbar";
import { PublicNavbarProps } from "@/features/Header/components/AppHeader/types";
import { getDrawerItem } from "@/features/Header/helpers/getDrawerItem";
import { NavbarItem } from "@/features/Header/components/Navbar/NavbarItem";


export function AppHeader({ user }: PublicNavbarProps) {
  return (
    <Navbar drawerItems={getDrawerItem(user)}>
      <NavbarItem />
    </Navbar>
  );
}
