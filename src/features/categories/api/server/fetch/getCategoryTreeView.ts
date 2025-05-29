import { createClient } from "@/lib/supabase/utils/server";
import {
  CategoryTreeListSchema,
  TCategoryTree,
} from "@/features/categories/api/schema";
import { TreeNodeData } from "@mantine/core";

interface FlatCategory {
  id: string;
  name: string;
  parent_id: string | null;
  created_at: string;
  user_id: string;
}

export type TGetCategoriesTreeView = {
  categories: TCategoryTree[];
  treeNodeData: TreeNodeData[];
};

function buildCategoryTreeView(
  categories: FlatCategory[]
): TGetCategoriesTreeView {
  const buildTree = (parentId: string | null = null): TCategoryTree[] => {
    return categories
      .filter((category) => category.parent_id === parentId)
      .map((category) => ({
        id: category.id,
        name: category.name,
        children: buildTree(category.id),
      }));
  };

  const tree = CategoryTreeListSchema.parse(buildTree());

  return {
    categories: tree,
    treeNodeData: tree.map((category) => ({
      label: category.name,
      value: category.id,
      children: category.children
        ? category.children.map((child) => ({
            label: child.name,
            value: child.id,
          }))
        : [],
    })),
  };
}

export async function getCategoryTreeView(): Promise<TGetCategoriesTreeView> {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }

  return buildCategoryTreeView(categories as FlatCategory[]);
}
