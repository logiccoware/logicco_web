"use client";

import {
  Box,
  Burger,
  Divider,
  Drawer,
  Group,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "@/components/layouts/PublicLayout/AppHeader/AppHeader.module.css";
import { NavBrandLink } from "@/components/layouts/shared/NavBrandLink";
import { AuthStatusLink } from "@/components/layouts/PublicLayout/AppHeader/AuthStatusLink";

export function AppHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <NavBrandLink />

          <Group visibleFrom="sm">
            <AuthStatusLink />
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <AuthStatusLink />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
