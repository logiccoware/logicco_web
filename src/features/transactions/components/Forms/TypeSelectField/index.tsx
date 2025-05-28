import { Select } from "@mantine/core";

interface IProps {
  type?: "INCOME" | "EXPENSE";
}

export function TypeSelectField({ type }: IProps) {
  return (
    <Select
      label="Type"
      placeholder="Select type"
      defaultValue={type}
      size="md"
      name="type"
      data={[
        { value: "INCOME", label: "Income" },
        { value: "EXPENSE", label: "Expense" },
      ]}
    />
  );
}
