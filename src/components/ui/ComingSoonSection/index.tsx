"use client";

import { useTranslations } from "next-intl";
import { Text, Stack, Box } from "@mantine/core";

export function ComingSoonSection() {
  const t = useTranslations("Common");
  // const { } = useUser

  return (
    <Box mt="xl">
      <Stack ta="center">
        <Text size="xl">
          Wecome{" "}
          <Box component="span" fw={700}>
            test@email.com
          </Box>
        </Text>
        <Text size="lg">App is {t("comingSoon")}</Text>
      </Stack>
    </Box>
  );
}
