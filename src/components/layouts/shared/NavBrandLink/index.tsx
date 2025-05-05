import { AppLogo } from "@/components/ui/AppLogo";
import NextLink from "next/link";
import classes from "@/components/layouts/shared/NavBrandLink/NavBrandLink.module.css";

export function NavBrandLink() {
  return (
    <NextLink href="/" className={classes.link}>
      <AppLogo />
    </NextLink>
  );
}
