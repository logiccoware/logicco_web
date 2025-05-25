import {
  ActionIcon,
  Box,
  Group,
  RenderTreeNodePayload,
  Text,
  TreeNodeData,
} from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import React from "react";

interface IProps {
  handleSelectNode: (treeNodeData: TreeNodeData | null) => void;
  renderProps: RenderTreeNodePayload;
}

export function TreeViewNode({
  renderProps: { node, hasChildren, expanded, elementProps, tree },
  handleSelectNode,
}: IProps) {
  return (
    <Group wrap="nowrap">
      {hasChildren ? (
        <ActionIcon
          disabled={!hasChildren}
          onClick={() => {
            tree.toggleExpanded(node.value);
          }}
          variant="default"
        >
          {expanded ? <IconChevronUp /> : <IconChevronDown />}
        </ActionIcon>
      ) : null}
      <Box
        {...elementProps}
        ml={hasChildren ? 0 : 42}
        flex={1}
        onClick={() => {
          if (tree.selectedState.includes(node.value)) {
            handleSelectNode(null);
            tree.clearSelected();
          } else {
            handleSelectNode(node);
            tree.setSelectedState([node.value]);
          }
        }}
      >
        <Text>{node.label}</Text>
      </Box>
    </Group>
  );
}
