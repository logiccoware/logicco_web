import { forwardRef } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { Group, UnstyledButton } from "@mantine/core";
import { AppLogo } from "@/components/ui/AppLogo";

type IProps = React.ComponentPropsWithoutRef<"button">;

// eslint-disable-next-line react/display-name
export const HeaderMenuTarget = forwardRef<HTMLButtonElement, IProps>(
  ({ ...others }: IProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}
    >
      <Group gap="xs">
        <AppLogo size={32} />
        <IconChevronRight size={24} />
      </Group>
    </UnstyledButton>
  )
);
