import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

interface IProps {
  handleClick: () => void;
}

export function ActionDeleteModalTrigger({ handleClick }: IProps) {
  return (
    <ActionIcon
      onClick={handleClick}
      size={32}
      color="red"
      variant="filled"
      aria-label="Delete"
    >
      <IconTrash size={24} />
    </ActionIcon>
  );
}
