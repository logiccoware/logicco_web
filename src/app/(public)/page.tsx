import { Text, Box } from "@mantine/core";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("Common");
  return (
    <Box mt="xl">
      <Text size="xl" ta="center">
        {t("comingSoon")}
      </Text>
    </Box>
  );
}
