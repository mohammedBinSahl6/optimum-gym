"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";

import MenuAside from "../menu-aside/MenuAside";
import navLinks from "@/data/navLinks";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

interface NavbarProps {
  isLoggedIn: boolean;
  user_image?: string;
}

const Navbar = ({ isLoggedIn, user_image }: NavbarProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <nav className="flex justify-between items-center p-5 bg-primary-blue text-white">
      <Image
        className="md:ml-10 rounded-s-md"
        src="/assets/logo.svg"
        alt="Logo"
        width="90"
        height="90"
      />
      {isLoggedIn ? (
        user_image ? (
          <Image
            className={cn("rounded-full hidden md:block ", {
              " border-4 border-primary-red": showMenu,
            })}
            width="90"
            height="90"
            alt="user image"
            src={user_image!}
            onClick={() => setShowMenu(!showMenu)}
          />
        ) : (
          <Image
            className={cn("rounded-full hidden md:block ", {
              " border-4 border-primary-red": showMenu,
            })}
            width="90"
            height="90"
            alt="user image"
            src="/assets/no-pic.svg"
            onClick={() => setShowMenu(!showMenu)}
          />
        )
      ) : (
        <Link href="/login">
          <Button className="hidden md:block" variant="secondary">
            Login
          </Button>
        </Link>
      )}
      <button className="p-2 md:hidden" onClick={() => setShowMenu(!showMenu)}>
        <Menu size={48} />
      </button>
      {showMenu && (
        <MenuAside
          isLoggedIn={isLoggedIn}
          navLinks={navLinks}
          setShowMenu={setShowMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;
