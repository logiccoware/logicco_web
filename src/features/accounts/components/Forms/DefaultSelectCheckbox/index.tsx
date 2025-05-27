"use client";

import { Checkbox } from "@mantine/core";

interface IProps {
  defaultChecked?: boolean;
}

export function DefaultSelectCheckbox({ defaultChecked }: IProps) {
  return (
    <Checkbox
      defaultChecked={defaultChecked}
      name="markAsDefault"
      label="Mark as default"
    />
  );
}
