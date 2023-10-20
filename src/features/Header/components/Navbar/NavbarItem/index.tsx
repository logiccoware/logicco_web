import NextLink from "next/link";
import { Button } from "@/components/ui/button";

interface NavbarItemProps {
  href: string;
  text: string;
}

export function NavbarItem({ href, text }: NavbarItemProps) {
  return (
    <NextLink href={href}>
      <Button>{text}</Button>
    </NextLink>
  );
}
