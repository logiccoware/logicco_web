"use client";

import { Button, Skeleton } from "@mantine/core";
import NextLink from "next/link";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from "@clerk/nextjs";
import { LoginButton } from "@/components/ui/Buttons/LoginButton";

export function AuthStatusLink() {
  return (
    <>
      <ClerkLoading>
        <Skeleton height={32} width={32} visible animate />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <LoginButton />
        </SignedOut>
        <SignedIn>
          <Button component={NextLink} href="/app">
            App
          </Button>
        </SignedIn>
      </ClerkLoaded>
    </>
  );
}
