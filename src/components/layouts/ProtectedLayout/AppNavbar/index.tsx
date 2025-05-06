import { IconSwitchHorizontal } from "@tabler/icons-react";
import classes from "@/components/layouts/ProtectedLayout/AppNavbar/AppNavbar.module.css";
import { NavbarLinks } from "@/components/layouts/ProtectedLayout/AppNavbar/NavbarLinks";
import NextLink from "next/link";
import { LogoutButton } from "@/components/ui/Buttons/LogoutButton";

interface IProps {
  toggleSideBar: () => void;
}

export function AppNavbar({ toggleSideBar }: IProps) {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <NavbarLinks toggleSideBar={toggleSideBar}/>
      </div>
      <div className={classes.footer}>
        <NextLink
          href="/app"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </NextLink>

        <LogoutButton />
      </div>
    </nav>
  );
}
