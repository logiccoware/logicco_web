import { Container, Paper, Title, Text, Stack } from "@mantine/core";
import classes from "@/app/(public)/login/LoginPage.module.css";
import { LoginAction } from "@/features/auth/components/Login/LoginAction";

export default async function LoginPage() {
  return (
    <Container size={420} my={40}>
      <Stack ta="center">
        <Title order={3} className={classes.title}>
          Sign in to Logicco
        </Title>
        <Text c="dimmed">Welcome back! Please sign in to continue</Text>
      </Stack>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <LoginAction />
      </Paper>
    </Container>
  );
}
