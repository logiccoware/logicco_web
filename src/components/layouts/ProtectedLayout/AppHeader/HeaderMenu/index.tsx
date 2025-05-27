"use client";

import { Menu } from "@mantine/core";
import { HeaderMenuTarget } from "@/components/layouts/ProtectedLayout/AppHeader/HeaderMenu/HeaderMenuTarget";
import { IconLogout } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/utils/client";
import { useRouter } from "next/navigation";

export function HeaderMenu() {
  const t = useTranslations("Common");
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login");
    }
  }
  return (
    <Menu withArrow width={200}>
      <Menu.Target>
        <HeaderMenuTarget />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          {t("protectedLayout.headerMenu.dropdowns.applicationLabel")}
        </Menu.Label>
        <Menu.Item
          color="red"
          onClick={() => signOut()}
          leftSection={<IconLogout size={14} />}
        >
          {t("protectedLayout.headerMenu.dropdowns.logout")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
