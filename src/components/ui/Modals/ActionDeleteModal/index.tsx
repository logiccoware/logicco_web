"use client";

import { Button, Group, Input, Text } from "@mantine/core";

interface IProps {
  entityId: string;
  message: string;
  formAction: (payload: FormData) => void;
  disabled: boolean;
  closeModal: () => void;
}

export function ActionDeleteModal({
  message,
  formAction,
  disabled,
  closeModal,
  entityId,
}: IProps) {
  return (
    <form action={formAction}>
      <Input type="hidden" name="entityId" value={entityId} />
      <Text>{message}</Text>
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={closeModal} disabled={disabled}>
          Cancel
        </Button>
        <Button color="red" type="submit" disabled={disabled}>
          Delete
        </Button>
      </Group>
    </form>
  );
}
