"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { MONOVRA_APP_LINK } from "@/lib/contants";

export const Navbar = () => {
  return (
    <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        <div className="flex items-center gap-3">
          <Button asChild className="rounded-full">
            <a href={MONOVRA_APP_LINK} target="_blank" rel="noreferrer">
              Sign In
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};
