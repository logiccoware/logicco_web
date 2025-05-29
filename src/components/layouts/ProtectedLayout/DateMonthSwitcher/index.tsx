"use client";

import { useCallback } from "react";
import { ActionIcon, Chip, Group } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import daysjs from "dayjs";

export function DateMonthSwitcher() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const monthQueryParam = searchParams.get("month");

  const currentMonth = monthQueryParam
    ? daysjs(monthQueryParam)
    : daysjs(new Date());

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleMonthChange = useCallback(
    (direction: "prev" | "next") => {
      const newMonth =
        direction === "prev"
          ? currentMonth.subtract(1, "month")
          : currentMonth.add(1, "month");

      const formattedDate = newMonth.startOf("month").format("YYYY-MM-DD");

      router.push(`${pathname}?${createQueryString("month", formattedDate)}`);
    },
    [currentMonth, createQueryString, pathname, router]
  );

  return (
    <Group>
      <ActionIcon onClick={() => handleMonthChange("prev")} variant="default">
        <IconChevronLeft />
      </ActionIcon>
      <Chip checked={false} variant="outline" size="md">
        {currentMonth.format("MMMM YYYY")}
      </Chip>
      <ActionIcon onClick={() => handleMonthChange("next")} variant="default">
        <IconChevronRight />
      </ActionIcon>
    </Group>
  );
}
