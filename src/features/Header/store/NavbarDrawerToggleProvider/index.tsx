"use client";

import { createActorContext } from "@xstate/react";
import { navbarDrawerToggleMachine } from "@/features/Header/store/navbarDrawerMachine";
import { PropsWithChildren } from "react";

export const NavbarDrawerToggleContext = createActorContext(
  navbarDrawerToggleMachine
);

export function NavbarDrawerToggleProvider({ children }: PropsWithChildren) {
  return (
    <NavbarDrawerToggleContext.Provider>
      {children}
    </NavbarDrawerToggleContext.Provider>
  );
}
