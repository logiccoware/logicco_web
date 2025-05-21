"use client";

import { Group, Paper, Stack, Text } from "@mantine/core";
import type { IDataListItem } from "@/components/ui/DataList/types";
import classes from "@/components/ui/DataList/DataList.module.css";

export interface IProps<T> {
  list: IDataListItem<T>[];
  onItemClick: (data: T) => void;
}

export function DataList<T>({ list, onItemClick }: IProps<T>) {
  return (
    <Stack gap="sm">
      {list.map((item) => (
        <Paper
          onClick={() => onItemClick(item.data)}
          className={classes.item}
          p="sm"
          withBorder
          key={item.id}
        >
          <Group align="start">
            {item.leftIcon}
            <Stack>
              <Text>{item.primaryText}</Text>
              {item.secondaryText ? (
                <Text size="sm" c="dimmed">
                  {item.secondaryText}
                </Text>
              ) : null}
            </Stack>
          </Group>
        </Paper>
      ))}
    </Stack>
  );
}
