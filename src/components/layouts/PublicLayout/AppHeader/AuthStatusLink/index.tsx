import { Button } from "@mantine/core";
import NextLink from "next/link";

export function AuthStatusLink() {
  return (
    <Button component={NextLink} href="/app">
      App
    </Button>
  );
}
