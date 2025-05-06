import { ComingSoonSection } from "@/components/ui/ComingSoonSection";
import { protectedRoute } from "@/lib/server/helpers/protectedRoute";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App | Logicco",
};

export default async function Home() {
  await protectedRoute();
  return (
    <div>
      <ComingSoonSection />
    </div>
  );
}
