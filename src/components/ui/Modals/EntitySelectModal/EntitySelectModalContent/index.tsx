import {
  Box,
  Button,
  Flex,
  Group,
  Input,
  ScrollArea,
  Stack,
  TreeNodeData,
  UseTreeReturnType,
} from "@mantine/core";
import { EntityTreeView } from "@/components/ui/Modals/EntitySelectModal/EntitySelectModalContent/EntityTreeView";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";

interface IProps {
  tree: UseTreeReturnType;
  actionButton: React.ReactNode;
  data: TreeNodeData[];
  closeModal: () => void;
}

export function EntitySelectModalContent({
  actionButton,
  data,
  tree,
  closeModal,
}: IProps) {
  const t = useTranslations("Common.modals.entitySelect");
  const isEntityChecked = Boolean(tree.checkedState[0]);
  const [searchResultData, setSearchResultData] =
    useState<TreeNodeData[]>(data);
  return (
    <>
      <Stack h="100%" gap="xs">
        {/* Sticky header */}
        <Flex
          gap="sm"
          justify="flex-start"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Input
            disabled={data.length === 0}
            rightSection={<IconSearch />}
            onChange={(value) => {
              setSearchResultData(
                data.filter((item) => {
                  const label = item.label as string;
                  return label
                    .toLowerCase()
                    .includes(value.currentTarget.value.toLowerCase());
                })
              );
            }}
            flex={1}
            placeholder="Search"
          />
          {actionButton}
        </Flex>

        {/* scrollable content */}
        <ScrollArea style={{ flex: 1 }}>
          <EntityTreeView data={searchResultData} tree={tree} />
        </ScrollArea>

        {/* Sticky footer */}
        <Box>
          <Group justify="flex-end">
            <Button
              variant="default"
              onClick={() => {
                closeModal();
              }}
            >
              {isEntityChecked ? t("cta.select") : t("cta.dismiss")}
            </Button>
          </Group>
        </Box>
      </Stack>
    </>
  );
}
