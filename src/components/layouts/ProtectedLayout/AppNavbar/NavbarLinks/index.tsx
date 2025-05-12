import classes from "@/components/layouts/ProtectedLayout/AppNavbar/NavbarLinks/NavbarLinks.module.css";
import { NAVBAR_LINKS } from "@/components/layouts/ProtectedLayout/constants";
import { useTranslations } from "next-intl";
import NextLink from "next/link";

interface IProps {
  toggleSideBar: () => void;
}

export function NavbarLinks({ toggleSideBar }: IProps) {
  const t = useTranslations();
  return NAVBAR_LINKS.map((item) => (
    <NextLink
      onClick={toggleSideBar}
      className={classes.link}
      href={item.link}
      key={item.i18Label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{t(item.i18Label)}</span>
    </NextLink>
  ));
}
