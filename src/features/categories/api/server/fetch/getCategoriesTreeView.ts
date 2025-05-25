import { z } from "zod";
import { getApiPath } from "@/lib/api/helpers/getApiPath";
import { getAuthHeader, getBaseHeaders } from "@/lib/api/helpers/headers";

export type TCategoryTree = z.infer<typeof BaseCategoryTreeSchema>;
export const BaseCategoryTreeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  children: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
    })
  ),
});

export type TGetCategoriesTreeView = z.infer<
  typeof GetCategoriesTreeViewSchema
>;
export const GetCategoriesTreeViewSchema = z.object({
  categories: z.array(BaseCategoryTreeSchema),
});

export async function getCategoriesTreeView(
  accessToken: string
): Promise<TGetCategoriesTreeView> {
  const res = await fetch(getApiPath("/categories/tree-view"), {
    method: "GET",
    headers: {
      ...getBaseHeaders(),
      ...getAuthHeader(accessToken),
    },
  });

  if (!res.ok) {
    throw new Error(
      `Error fetching categories: ${res.status} ${res.statusText}`
    );
  }

  return GetCategoriesTreeViewSchema.parse(await res.json());
}
