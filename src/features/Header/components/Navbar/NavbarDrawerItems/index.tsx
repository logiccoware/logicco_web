"use client";

import type { NavbarLink } from "@/features/Header/types";
import { NavbarDrawerItem } from "@/features/Header/components/Navbar/NavbarDrawerItem";
import { WithClassName } from "@/lib/types";

interface NavbarDrawerItemsProps extends WithClassName {
  drawerItems: NavbarLink[];
}

export function NavbarDrawerItems({
  drawerItems,
  className,
}: NavbarDrawerItemsProps) {
  return (
    <div className={className}>
      {drawerItems.map(({ href, label, Icon }) => (
        <NavbarDrawerItem key={href} href={href} label={label} Icon={Icon} />
      ))}
    </div>
  );
}
