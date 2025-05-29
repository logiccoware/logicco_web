import { Group, Skeleton, Stack } from "@mantine/core";

export function PageDateLoading() {
  return (
    <Stack mt='xl' gap="xl">
      <Group grow>
        <Skeleton w="50%" height={50} radius="sm" />
        <Skeleton w="50%" height={50} radius="sm" />
      </Group>
      <Stack mt="lg" gap="xl">
        <Skeleton height={50} w="100%" radius="sm" />
        <Skeleton height={50} w="100%" radius="sm" />
        <Skeleton height={50} w="100%" radius="sm" />
        <Skeleton height={50} w="100%" radius="sm" />
        <Skeleton height={50} w="100%" radius="sm" />
        <Skeleton height={50} w="100%" radius="sm" />
        <Skeleton height={50} w="100%" radius="sm" />
        <Skeleton height={50} w="100%" radius="sm" />
      </Stack>
    </Stack>
  );
}
