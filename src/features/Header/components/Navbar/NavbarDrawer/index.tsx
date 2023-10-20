"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { PropsWithChildren } from "react";
import { useNavbarDrawerToggle } from "@/features/Header/hooks/useNavbarDrawerToggle";

export function NavbarDrawer({ children }: PropsWithChildren) {
  const { isNavbarDrawerOpen, toggleNavbarDrawer } = useNavbarDrawerToggle();
  return ( 
    <Sheet
      open={isNavbarDrawerOpen}
      onOpenChange={toggleNavbarDrawer}
    >
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <section>{children}</section>
      </SheetContent>
    </Sheet>
  );
}
