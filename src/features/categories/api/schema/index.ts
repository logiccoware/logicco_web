import { z } from "zod";

export const CategoyFormFieldsSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

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

export const CategoryTreeListSchema = z.array(BaseCategoryTreeSchema);
