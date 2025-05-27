import { z } from "zod";

export type TPayeeBase = z.infer<typeof PayeeBaseSchema>;
export const PayeeBaseSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

export type TGetPayeesList = z.infer<typeof GetPayeesSchema>;
export const GetPayeesSchema = z.object({
  payees: z.array(PayeeBaseSchema),
});

export type TPayeeFormFields = z.infer<typeof PayeeFormFieldsSchema>;
export const PayeeFormFieldsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});
