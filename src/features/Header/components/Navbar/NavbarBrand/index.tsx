import { WithChildrenAndClassName } from "@/lib/types";
import classNames from "classnames";
import NextLink from "next/link";

export function NavbarBrand({
  children,
  className,
}: WithChildrenAndClassName) {
  return (
    <NextLink href="/" className={classNames("text-xl", className)}>
      {children}
    </NextLink>
  );
}
