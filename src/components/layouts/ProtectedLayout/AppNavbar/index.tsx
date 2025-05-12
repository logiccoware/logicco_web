import classes from "@/components/layouts/ProtectedLayout/AppNavbar/AppNavbar.module.css";
import { NavbarLinks } from "@/components/layouts/ProtectedLayout/AppNavbar/NavbarLinks";

interface IProps {
  toggleSideBar: () => void;
}

export function AppNavbar({ toggleSideBar }: IProps) {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <NavbarLinks toggleSideBar={toggleSideBar} />
      </div>
    </nav>
  );
}
