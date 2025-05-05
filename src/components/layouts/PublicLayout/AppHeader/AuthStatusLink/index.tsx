"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "@mantine/core";
import NextLink from "next/link";

export function AuthStatusLink() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  if (user) {
    return (
      <Button component={NextLink} href="/app">
        App
      </Button>
    );
  }

  return (
    <a href="/auth/login">
      <Button>Sign In</Button>
    </a>
  );
}
