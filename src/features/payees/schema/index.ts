import { z } from "zod";

export type TPayeeBase = z.infer<typeof PayeeBaseSchema>;
export const PayeeBaseSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});
