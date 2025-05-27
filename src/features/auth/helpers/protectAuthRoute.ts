"use server";

import { createClient } from "@/lib/supabase/utils/server";
import { redirect } from "next/navigation";

export async function protectAuthRoute() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
}
