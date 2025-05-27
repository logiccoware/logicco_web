"use server";

import { createClient } from "@/lib/supabase/utils/server";
import { TGetPayeesList, GetPayeesSchema } from "@/features/payees/schema";

export async function getPayeesList(): Promise<TGetPayeesList> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("payees")
    .select("id,name")
    .order("name");
  return GetPayeesSchema.parse({
    payees: data ?? [],
  });
}
