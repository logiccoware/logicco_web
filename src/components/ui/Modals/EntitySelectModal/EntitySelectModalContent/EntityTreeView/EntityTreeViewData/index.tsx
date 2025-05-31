import { IconChevronDown } from "@tabler/icons-react";
import { Checkbox, Group, RenderTreeNodePayload } from "@mantine/core";

export function EntityTreeViewData({
  node,
  expanded,
  hasChildren,
  elementProps,
  tree,
}: RenderTreeNodePayload) {
  const checked = tree.isNodeChecked(node.value);
  const indeterminate = tree.isNodeIndeterminate(node.value);

  return (
    <Group gap="xs" {...elementProps}>
      <Checkbox.Indicator
        checked={checked}
        indeterminate={indeterminate}
        onClick={() => {
          if (!checked) {
            const currentlyCheckedValues = tree.checkedState;
            if (currentlyCheckedValues.length > 0) {
              tree.uncheckAllNodes();
            }
            tree.checkNode(node.value);
          } else {
            tree.uncheckNode(node.value);
          }
        }}
      />

      <Group gap={5} onClick={() => tree.toggleExpanded(node.value)}>
        <span>{node.label}</span>

        {hasChildren && (
          <IconChevronDown
            size={14}
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        )}
      </Group>
    </Group>
  );
}
