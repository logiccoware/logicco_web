import { z } from "zod";

export type TCurrnecyCode = z.infer<typeof CurrencyCodeSchema>;
export const CurrencyCodeSchema = z.enum(["USD", "INR", "CAD"], {
  message: "Invalid currency code",
});

export type TAccountBase = z.infer<typeof AccountBaseSchema>;
export const AccountBaseSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  currency: CurrencyCodeSchema,
});

export type TAccountDefaultSelectedCookie = z.infer<
  typeof AccountDefaultSelectedCookieSchema
>;
export const AccountDefaultSelectedCookieSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  currency: CurrencyCodeSchema,
});

export type TGetAccountsList = z.infer<typeof GetAccountsList>;
export const GetAccountsList = z.object({
  accounts: z.array(AccountBaseSchema),
});

export type TAccountFormFields = z.infer<typeof AccountFormFieldsSchema>;
export const AccountFormFieldsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  currency: CurrencyCodeSchema,
});
