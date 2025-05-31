import {
  Box,
  Button,
  Flex,
  Group,
  ScrollArea,
  Stack,
  TreeNodeData,
  UseTreeReturnType,
} from "@mantine/core";
import { EntityTreeView } from "@/components/ui/Modals/EntitySelectModal/EntitySelectModalContent/EntityTreeView";
import { useTranslations } from "next-intl";

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

  return (
    <>
      <Stack h="100%" gap="xs">
        {/* Sticky header */}
        <Flex
          gap="sm"
          justify='flex-end'
          align="center"
          direction="row"
          wrap="wrap"
        >
          {actionButton}
        </Flex>

        {/* scrollable content */}
        <ScrollArea style={{ flex: 1 }}>
          <EntityTreeView data={data} tree={tree} />
        </ScrollArea>

        {/* Sticky footer */}
        <Box>
          <Group justify="flex-end">
            <Button variant="default" onClick={closeModal}>
              {isEntityChecked ? t("cta.select") : t("cta.dismiss")}
            </Button>
          </Group>
        </Box>
      </Stack>
    </>
  );
}
