"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";

import MenuAside from "../menu-aside/MenuAside";
import navLinks from "@/lib/data/navLinks";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import Loader from "../loader/Loader";
import NavbarDropdown from "./NavbarDropdown";
import { Link, usePathname } from "@/routes";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { data, status } = useSession();

  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <nav className="flex justify-between items-center p-5 bg-primary-blue text-white relative z-10">
      <Image
        className="md:ml-10 rounded-s-md"
        src="/assets/logo.svg"
        alt="Logo"
        width="90"
        height="90"
      />
      {status === "loading" ? (
        <Loader />
      ) : data?.user ? (
        <NavbarDropdown />
      ) : (
        <Link href="/login">
          <Button className="hidden md:block" variant="secondary">
            Login
          </Button>
        </Link>
      )}
      <button className=" md:hidden" onClick={() => setShowMenu(!showMenu)}>
        <Menu size={48} />
      </button>
      {showMenu && (
        <MenuAside
          navLinks={navLinks}
          setShowMenu={setShowMenu}
        />
      )}
    </nav>
  );
};

export default Navbar;
