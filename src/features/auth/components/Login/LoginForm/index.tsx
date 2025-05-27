import { Alert, Button, PasswordInput, Stack, TextInput } from "@mantine/core";

interface IProps {
  errorMessage?: string;
  formAction: (payload: FormData) => void;
  disabled?: boolean;
}

export function LoginForm({ formAction, errorMessage, disabled }: IProps) {
  return (
    <Stack>
      {errorMessage ? <Alert color="red"> {errorMessage} </Alert> : null}
      <form action={formAction}>
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          radius="md"
          name="email"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          radius="md"
          name="password"
        />
        <Button disabled={disabled} type="submit" fullWidth mt="xl" radius="md">
          Sign in
        </Button>
      </form>
    </Stack>
  );
}
