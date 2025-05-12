"use client";

import { useTranslations } from "next-intl";
import { Text, Stack, Box, Skeleton, Center } from "@mantine/core";
import { ClerkLoaded, ClerkLoading, useUser } from "@clerk/nextjs";

export function ComingSoonSection() {
  const t = useTranslations();
  const { user } = useUser();

  return (
    <Box mt="xl">
      <Center>
        <Stack ta="center">
          <ClerkLoading>
            <Skeleton height={32} width={320} visible animate />
          </ClerkLoading>
          <ClerkLoaded>
            <Text size="xl">
              {t("App.welcomeMessage")}
              <Box component="span" fw={700}>
                {user?.primaryEmailAddress?.emailAddress ?? ""}
              </Box>
            </Text>
          </ClerkLoaded>

          <Text size="lg">App is {t("Common.comingSoon")}</Text>
        </Stack>
      </Center>
    </Box>
  );
}
