import { AccountBaseSchema } from "@/features/accounts/schema";

export function decodeAccountDefaultSelectedCookie(cookieValue: unknown) {
  if (typeof cookieValue !== "string") {
    return null;
  }
  
  const parsedAccount = AccountBaseSchema.safeParse(
    JSON.parse(cookieValue as string)
  );

  if (parsedAccount.success) {
    return parsedAccount.data;
  }

  return null;
}
