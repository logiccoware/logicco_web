import { NumberInput } from "@mantine/core";

interface IProps {
  amount?: number;
}

export function AmountField({ amount }: IProps) {
  return (
    <NumberInput
      label="Amount"
      placeholder="Enter amount"
      defaultValue={amount}
      allowDecimal
      name="amount"
      size="md"
    />
  );
}
