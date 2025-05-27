"use server";

import { createClient } from "@/lib/supabase/utils/server";
import {
  GetCategoriesTreeViewSchema,
  TCategoryTree,
  TGetCategoriesTreeView,
} from "@/features/categories/api/schema";

interface FlatCategory {
  id: string;
  name: string;
  parent_id: string | null;
  created_at: string;
  user_id: string;
}

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

  return {
    categories: buildTree(),
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

  return GetCategoriesTreeViewSchema.parse(
    buildCategoryTreeView(categories as FlatCategory[])
  );
}
