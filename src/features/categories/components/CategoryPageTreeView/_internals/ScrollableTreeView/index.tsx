import {
  Card,
  ScrollArea,
  TreeNodeData,
  UseTreeReturnType,
} from "@mantine/core";
import { CategoriesTreeView } from "@/features/categories/components/CategoriesTreeView";
import { TSelectCategoryFunction } from "@/features/categories/store/stateMachines/types";

interface IProps {
  data: TreeNodeData[];
  tree: UseTreeReturnType;
  selectCategory: TSelectCategoryFunction;
  unSelectCategory: () => void;
}

export function ScrollableTreeView({
  tree,
  data,
  selectCategory,
  unSelectCategory,
}: IProps) {
  return (
    <ScrollArea h="calc(100vh - 200px)">
      <Card h={"100%"}>
        <CategoriesTreeView
          tree={tree}
          data={data}
          selectCategory={selectCategory}
          unSelectCategory={unSelectCategory}
        />
      </Card>
    </ScrollArea>
  );
}
