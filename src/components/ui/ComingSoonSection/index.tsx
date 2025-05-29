"use client";

import { useTranslations } from "next-intl";
import { Text, Stack, Box, Center } from "@mantine/core";

export function ComingSoonSection() {
  const t = useTranslations();

  return (
    <Box mt="xl">
      <Center>
        <Stack ta="center">
          <Text size="lg">{t("Common.comingSoon")}</Text>
        </Stack>
      </Center>
    </Box>
  );
}
