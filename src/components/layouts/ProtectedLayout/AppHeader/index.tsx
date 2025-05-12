'use client";';

import { Burger, Group } from "@mantine/core";
import { HeaderMenu } from "@/components/layouts/ProtectedLayout/AppHeader/HeaderMenu";

interface IProps {
  opened: boolean;
  toggle: () => void;
}

export function AppHeader({ opened, toggle }: IProps) {
  return (
    <Group ml='sm' h="100%">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <HeaderMenu />
    </Group>
  );
}
