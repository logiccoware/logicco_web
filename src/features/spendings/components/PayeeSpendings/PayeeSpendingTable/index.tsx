"use client";
import { TPayeeSpending } from "@/features/spendings/api/server/fetch/getSpendingByPayee";
import { Table } from "@mantine/core";

interface IProps {
   spendings: TPayeeSpending[]; 
}

export function PayeeSpendingTable({ spendings }: IProps) {
  const rows = spendings.map((spending) => (
    <Table.Tr key={spending.id}>
      <Table.Td>{spending.name}</Table.Td>
      <Table.Td>{spending.amount}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Table striped withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Amount</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
