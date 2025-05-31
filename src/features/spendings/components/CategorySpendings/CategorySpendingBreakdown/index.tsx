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
      {spendings.map((item, index) => (
        <BreakdownItem
          key={item.id}
          item={item}
          isLastItem={index === spendings.length - 1}
        />
      ))}
    </Accordion>
  );
}
