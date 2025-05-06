"use client";

import { Button } from "@mantine/core";
import NextLink from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { LoginButton } from "@/components/ui/Buttons/LoginButton";

export function AuthStatusLink() {
  return (
    <>
      <SignedOut>
        <LoginButton />
      </SignedOut>
      <SignedIn>
        <Button component={NextLink} href="/app">
          App
        </Button>
      </SignedIn>
    </>
  );
}
