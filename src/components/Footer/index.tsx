import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export const Footer = () => {
  return (
    <footer>
      <div className="max-w-screen-xl mx-auto">
        <div className="py-12 flex flex-col justify-start items-center">
          <Logo />
        </div>
        <Separator />
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" target="_blank">
              Monovra
            </Link>
            . All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
