import { TreeNodeData } from "@mantine/core";

// Recursively filter tree nodes by label
export function filterTreeNodeData(
  nodes: TreeNodeData[],
  searchTerm: string
): TreeNodeData[] {
  if (!searchTerm) return nodes;
  const lower = searchTerm.toLowerCase();

  return nodes
    .map((node) => {
      const label = typeof node.label === "string" ? node.label : "";
      const labelMatch = label.toLowerCase().includes(lower);

      if (node.children) {
        const filteredChildren = filterTreeNodeData(node.children, searchTerm);
        if (labelMatch || filteredChildren.length > 0) {
          return { ...node, children: filteredChildren };
        }
      } else if (labelMatch) {
        return node;
      }
      return null;
    })
    .filter(Boolean) as TreeNodeData[];
}
