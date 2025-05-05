"use client";

import { useTranslations } from "next-intl";
import { Text, Stack, Box, Center } from "@mantine/core";
import { useUser } from "@auth0/nextjs-auth0";
import { LogoutButton } from "@/components/ui/LogoutButton";

export function ComingSoonSection() {
  const t = useTranslations("Common");
  const { user } = useUser();

  return (
    <Box mt="xl">
      <Stack ta="center">
        <Text size="xl">
          Wecome{" "}
          <Box component="span" fw={700}>
            {user?.email}
          </Box>
        </Text>
        <Text size="lg">App is {t("comingSoon")}</Text>
      </Stack>
      <Center mt="md">
        <LogoutButton />
      </Center>
    </Box>
  );
}
