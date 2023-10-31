"use client";

import { HOME_ROUTE, INVITE_ROUTE } from "@/domain/routes";
import { NavbarLink } from "@/features/Header/types";
import { Info, Mail } from "lucide-react";

export const NAVBAR_DRAWER_AUTH_LINKS: NavbarLink[] = [
  {
    label: "Payees",
    href: HOME_ROUTE,
  },
];

export const NAVBAR_DRAWER_NON_AUTH_LINKS: NavbarLink[] = [
  {
    label: "Sign Up",
    href: INVITE_ROUTE,
    Icon: Mail,
  },
  {
    label: "About",
    href: HOME_ROUTE,
    Icon: Info,
  },
];
