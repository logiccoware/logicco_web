"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

export const Navbar = () => {
  return (
    <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              console.log("test");
            }}
            className="rounded-full"
          >
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
};
