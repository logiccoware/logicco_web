import { IconLogout, IconSwitchHorizontal } from "@tabler/icons-react";
import classes from "@/components/layouts/ProtectedLayout/AppNavbar/AppNavbar.module.css";
import { NavbarLinks } from "@/components/layouts/ProtectedLayout/AppNavbar/NavbarLinks";

export function AppNavbar() {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <NavbarLinks />
      </div>
      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
