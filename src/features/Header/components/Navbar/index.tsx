import { NavbarBrand } from "@/features/Header/components/Navbar/NavbarBrand";
import { NavbarDrawer } from "@/features/Header/components/Navbar/NavbarDrawer";
import { PropsWithChildren } from "react";
import { NavbarDrawerItems } from "@/features/Header/components/Navbar/NavbarDrawerItems";
import { NavbarDrawerToggleProvider } from "../../store/NavbarDrawerToggleProvider";
import { stringResources } from "@/stringResources";

export function Navbar({ children }: PropsWithChildren) {
  return (
    <nav className="p-4 flex justify-between items-center">
      <NavbarDrawerToggleProvider>
        <NavbarDrawer>
          <NavbarDrawerItems className="my-4" />
        </NavbarDrawer>
      </NavbarDrawerToggleProvider>
      <NavbarBrand>{stringResources.app.title}</NavbarBrand>
      <section>{children}</section>
    </nav>
  );
}
