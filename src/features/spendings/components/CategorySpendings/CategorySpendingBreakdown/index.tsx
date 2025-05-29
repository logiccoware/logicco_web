"use client";

import { Accordion } from "@mantine/core";
import type { TCategorySpendingListItem } from "@/features/spendings/api/server/fetch/getSpendingByCategory";
import { BreakdownItem } from "./BreakdownItem";

interface IProps {
  spendings: TCategorySpendingListItem[];
}

export function CategorySpendingBreakdown({ spendings }: IProps) {
  return (
    <Accordion chevronPosition="left" defaultValue="Apples">
      {spendings.map((item) => (
        <BreakdownItem key={item.id} item={item} />
      ))}
    </Accordion>
  );
}
