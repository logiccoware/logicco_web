import { Menu } from "@mantine/core";
import { HeaderMenuTarget } from "@/components/layouts/ProtectedLayout/AppHeader/HeaderMenu/HeaderMenuTarget";
import { IconSettings, IconLogout } from "@tabler/icons-react";
import { useClerk } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export function HeaderMenu() {
  const { signOut, openUserProfile } = useClerk();
  const t = useTranslations("Common");
  return (
    <Menu withArrow width={200}>
      <Menu.Target>
        <HeaderMenuTarget />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t('protectedLayout.headerMenu.dropdowns.applicationLabel')}</Menu.Label>
        <Menu.Item
          onClick={() => openUserProfile()}
          leftSection={<IconSettings size={14} />}
        >
          {t('protectedLayout.headerMenu.dropdowns.account')}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          onClick={() => signOut({ redirectUrl: "/" })}
          leftSection={<IconLogout size={14} />}
        >
          {t('protectedLayout.headerMenu.dropdowns.logout')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
