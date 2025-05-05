import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";

export function LogoutButton() {
  return (
    <a href="/auth/logout">
      <Button rightSection={<IconLogout />}>Logout</Button>
    </a>
  );
}
