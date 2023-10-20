import { NavbarBrand } from "@/features/Header/components/Navbar/NavbarBrand";
import { NavbarDrawer } from "@/features/Header/components/Navbar/NavbarDrawer";
import { PropsWithChildren } from "react";
import type { NavbarLink } from "@/features/Header/types";
import { NavbarDrawerItems } from "@/features/Header/components/Navbar/NavbarDrawerItems";
import { NavbarDrawerToggleProvider } from "../../store/NavbarDrawerToggleProvider";
import { stringResources } from "@/stringResources";

interface NavbarProps extends PropsWithChildren {
  drawerItems: NavbarLink[];
}

export function Navbar({ children, drawerItems }: NavbarProps) {
  return (
    <nav className="p-4 flex justify-between items-center">
      <NavbarDrawerToggleProvider>
        <NavbarDrawer>
          <NavbarDrawerItems className="my-4" drawerItems={drawerItems} />
        </NavbarDrawer>
      </NavbarDrawerToggleProvider>
      <NavbarBrand>{stringResources.app.title}</NavbarBrand>
      <section>{children}</section>
    </nav>
  );
}
