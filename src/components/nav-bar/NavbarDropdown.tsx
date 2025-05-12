"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { signOut, useSession } from "next-auth/react";
import { LogInIcon, LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import navLinks from "@/lib/data/navLinks";
import { Link } from "@/i18n/routes";
import LanguageSelector from "../lang-selector/LanguageSelector";

const NavbarDropdown = () => {
  const [showMenu, setShowMenu] = React.useState<boolean>(false);

  const { data, status } = useSession();
  const t = useTranslations("Navigation");

  return (
    <DropdownMenu modal={false} open={showMenu} onOpenChange={setShowMenu}>
      <DropdownMenuTrigger asChild>
        <Image
          className={cn("rounded-full hidden md:block ", {
            " border-4 border-primary-red": showMenu,
          })}
          width="70"
          height="70"
          alt="user image"
          src={data?.user?.image ?? "/assets/no-pic.svg"}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {navLinks.map((link) => (
          <DropdownMenuItem key={link.name}>
            <Link href={link.href}>
              <Button variant="ghost" className="flex items-center gap-5">
                {link.icon}
                {link.name}
              </Button>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <LanguageSelector />
        </DropdownMenuItem>
        <DropdownMenuItem>
          {status === "authenticated" ? (
            <Button
              className="flex items-center gap-5"
              variant="ghost"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOutIcon />
              {t("Logout")}
            </Button>
          ) : (
            <Link href="/login">
              <Button className="flex items-center gap-5" variant="ghost">
                <LogInIcon />
                {t("Login")}
              </Button>
            </Link>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarDropdown;
