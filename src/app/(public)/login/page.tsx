import { Container, Paper, Title, Text, Stack } from "@mantine/core";
import classes from "@/app/(public)/login/LoginPage.module.css";
import { LoginAction } from "@/features/auth/components/Login/LoginAction";
import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/utils/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Logicco",
};

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/app");
  }

  const t = await getTranslations("Auth.login.page");
  return (
    <Container size={420} my={40}>
      <Stack ta="center">
        <Title order={3} className={classes.title}>
          {t("title")}
        </Title>
        <Text c="dimmed">{t("subtitle")}</Text>
      </Stack>
      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <LoginAction />
      </Paper>
    </Container>
  );
}
