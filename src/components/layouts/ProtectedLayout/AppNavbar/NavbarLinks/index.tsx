import classes from "@/components/layouts/ProtectedLayout/AppNavbar/NavbarLinks/NavbarLinks.module.css";
import { NAVBAR_LINKS } from "@/components/layouts/ProtectedLayout/constants";
import NextLink from "next/link";

interface IProps {
  toggleSideBar: () => void;
}

export function NavbarLinks({ toggleSideBar }: IProps) {
  return NAVBAR_LINKS.map((item) => (
    <NextLink
      onClick={toggleSideBar}
      className={classes.link}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NextLink>
  ));
}
