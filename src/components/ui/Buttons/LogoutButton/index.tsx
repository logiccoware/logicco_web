"use client";

import { IconLogout } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { useClerk } from "@clerk/nextjs";

export function LogoutButton() {
  const { signOut } = useClerk();
  return (
    <Button
      onClick={() => signOut({ redirectUrl: "/" })}
      size="md"
      fullWidth
      variant="default"
      rightSection={<IconLogout />}
    >
      Logout
    </Button>
  );
}
