import { ComingSoonSection } from "@/components/ui/ComingSoonSection";
import { protectedRoute } from "@/lib/server/helpers/protectedRoute";

export default async function Home() {
  await protectedRoute();
  return (
    <div>
      <ComingSoonSection />
    </div>
  );
}
