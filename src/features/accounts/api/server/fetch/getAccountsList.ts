"use server";

import { createClient } from "@/lib/supabase/utils/server";
import { TGetAccountsList, GetAccountsList } from "@/features/accounts/schema";

export async function getAccountsList(): Promise<TGetAccountsList> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("accounts")
    .select("id,name,currency")
    .order("name");
  return GetAccountsList.parse({
    accounts: data ?? [],
  });
}
