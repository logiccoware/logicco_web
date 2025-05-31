import { getPayeesList } from "@/features/payees/api/server/fetch/getPayeesList";
import { TreeNodeData } from "@mantine/core";

export async function getPayeesTreeNodeData(): Promise<TreeNodeData[]> {
  const { payees } = await getPayeesList();
  return payees.map((payee) => {
    return {
      label: payee.name,
      value: payee.id,
    };
  });
}
