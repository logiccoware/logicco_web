"use client";

import { Accordion, Alert, Box, Divider, Group, List } from "@mantine/core";
import type { TCategorySpendingListItem } from "@/features/spendings/api/server/fetch/getSpendingByCategory";

interface IProps {
  item: TCategorySpendingListItem;
  isLastItem?: boolean;
}

export function BreakdownItem({ item, isLastItem }: IProps) {
  const hasChildren = item.children.length > 0;

  return (
    <Accordion.Item key={item.id} value={item.name}>
      <Accordion.Control>
        <Group>
          {item.name}: {item.totalAmount}
        </Group>
      </Accordion.Control>

      <Accordion.Panel>
        {hasChildren ? (
          <List ml={42} listStyleType="none" spacing="md" center>
            {item.children.map((child) => (
              <Box key={child.id}>
                <List.Item key={child.id}>
                  <Group justify="space-between">
                    {child.name}: {child.amount}
                  </Group>
                </List.Item>
                {!isLastItem ? <Divider mt="sm" mb="md" /> : null}
              </Box>
            ))}
          </List>
        ) : (
          <Alert>No sub category transaction added.</Alert>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  );
}
