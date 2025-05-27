"use client";

import { Menu } from "@mantine/core";
import { HeaderMenuTarget } from "@/components/layouts/ProtectedLayout/AppHeader/HeaderMenu/HeaderMenuTarget";
import { IconLogout } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import { logoutAction } from "@/features/auth/api/server/actions/logoutAction";

export function HeaderMenu() {
  const t = useTranslations("Common");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction, pending] = useActionState(logoutAction, null);

  return (
    <Menu withArrow width={200}>
      <Menu.Target>
        <HeaderMenuTarget />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          {t("protectedLayout.headerMenu.dropdowns.applicationLabel")}
        </Menu.Label>
        <form action={formAction}>
          <Menu.Item
            color="red"
            component="button"
            type="submit"
            leftSection={<IconLogout size={14} />}
            disabled={pending}
          >
            {t("protectedLayout.headerMenu.dropdowns.logout")}
          </Menu.Item>
        </form>
      </Menu.Dropdown>
    </Menu>
  );
}
