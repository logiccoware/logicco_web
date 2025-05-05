import { Container, Title, Paper, Button, Text, Stack } from "@mantine/core";
import classes from "@/features/auth/components/SignInRequired/SignInRequired.module.css";

export function SignInRequired() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Logicco Account
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Stack>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            You must be signed in to access the application
          </Text>
          <a href="/auth/login">
            <Button>Sign In</Button>
          </a>
        </Stack>
      </Paper>
    </Container>
  );
}
