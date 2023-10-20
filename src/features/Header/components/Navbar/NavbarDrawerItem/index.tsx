'use client';

import { useNavbarDrawerToggle } from "@/features/Header/hooks/useNavbarDrawerToggle";
import NextLink from "next/link";
import { ElementType } from "react";

interface NavbarDrawerItemProps {
  href: string;
  label: string;
  Icon?: ElementType;
}

export function NavbarDrawerItem({ href, label, Icon }: NavbarDrawerItemProps) {
  const { toggleNavbarDrawer } = useNavbarDrawerToggle();
  return (
    <NextLink
      onClick={toggleNavbarDrawer}
      className="w-full flex items-center my-2 text-lg"
      href={href}
    >
      {Icon ? <Icon className="mr-2 h-4 w-4" /> : null} {label}
    </NextLink>
  );
}
