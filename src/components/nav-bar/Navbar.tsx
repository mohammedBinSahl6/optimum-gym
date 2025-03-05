"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";

import MenuAside from "../menu-aside/MenuAside";
import navLinks from "@/data/navLinks";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isLoggedIn: boolean;
  user_image?: string;
}

const Navbar = ({ isLoggedIn, user_image }: NavbarProps) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex justify-between items-center p-2 bg-primary-blue text-white">
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
        <button className="hidden md:block p-4 rounded-sm  bg-primary-light hover:bg-white text-primary-blue  md:mr-10">
          Login
        </button>
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
