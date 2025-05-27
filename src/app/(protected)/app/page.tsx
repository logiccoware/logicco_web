import { ComingSoonSection } from "@/components/ui/ComingSoonSection";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/utils/server";

export const metadata: Metadata = {
  title: "App | Logicco",
};

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <div>
      <ComingSoonSection />
    </div>
  );
}
