import { Drawer } from "@mantine/core";

interface IProps {
  opened: boolean;
  close: () => void;
}

export function TransactionDrawer({ opened, close }: IProps) {
  return (
    <Drawer opened={opened} onClose={close} title="Authentication">
      {/* Drawer content */}
    </Drawer>
  );
}
