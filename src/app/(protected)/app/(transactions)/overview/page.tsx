import type { Metadata } from "next";
import { Stack } from "@mantine/core";
import { protectAuthRoute } from "@/features/auth/helpers/protectAuthRoute";
import { ComingSoonSection } from "@/components/ui/ComingSoonSection";

export const metadata: Metadata = {
  title: "Overview | Logicco",
};

export default async function OverviewPage() {
  await protectAuthRoute();
  return (
    <Stack gap="md">
      <ComingSoonSection />
    </Stack>
  );
}
