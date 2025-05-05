import { AppLogo } from "@/components/ui/AppLogo";
import { Burger, Group } from "@mantine/core";

interface IProps {
  opened: boolean;
  toggle: () => void;
}

export function AppHeader({ opened, toggle }: IProps) {
  return (
    <Group h="100%">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <AppLogo size={48} />
    </Group>
  );
}
