"use client";

import { Button } from "@mantine/core";
import { useClerk } from "@clerk/nextjs";

export function LoginButton() {
  const { redirectToSignIn } = useClerk();
  return <Button onClick={() => redirectToSignIn()}>Sign In</Button>;
}
