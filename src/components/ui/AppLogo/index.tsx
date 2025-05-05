import { Group, Title } from "@mantine/core";
import { LogoSvg } from "@/components/ui/AppLogo/LogoSvg";

interface AppLogoProps {
  size?: number;
}

export const AppLogo = ({ size = 36 }: AppLogoProps) => {
  return (
    <Group gap={0}>
      <LogoSvg size={size} />
      <Title order={3}>Logicco</Title>
    </Group>
  );
};
