import { DateInput } from "@mantine/dates";

interface IProps {
  date?: Date;
}

export function DateField({ date }: IProps) {
  return (
    <>
      <DateInput
        name="date"
        size="md"
        label="Date"
        placeholder="Date input"
        defaultDate={date}
      />
    </>
  );
}
