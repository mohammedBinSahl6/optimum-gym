import React from "react";
import { LogIn, LogOut, X } from "lucide-react";

import MenuAsideItem from "./MenuAsideItem";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { Link, usePathname } from "@/i18n/routes";
import Image from "next/image";
import LanguageSelector from "../lang-selector/LanguageSelector";

const MenuAside = ({
  setShowMenu,
  navLinks,
}: {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  navLinks: { name: string; href: string; icon: React.ReactNode }[];
}) => {
  const pathname = usePathname();

  const { data, status } = useSession();
  return (
    <aside
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="w-full h-lvh rounded-b-md bg-primary-blue p-5 fixed top-0 left-0 z-50 transition-all animate-menu-aside-slide"
    >
      <header className="flex justify-between items-center w-full">
        <LanguageSelector />
        <button onClick={() => setShowMenu(false)} className="text-4xl">
          <X size={48} color="#fff" />
        </button>
      </header>
      <div className="flex gap-3 flex-col items-end mt-28 w-full">
        <Image
          className="rounded-full mb-10"
          width="70"
          height="70"
          alt="user image"
          src={data?.user?.image ?? "/assets/no-pic.svg"}
        />
        {navLinks.map((link) => {
          const activePath = pathname === link.href;
          return (
            <MenuAsideItem
              activePath={activePath}
              label={link.name}
              href={link.href}
              icon={link.icon}
              key={link.name}
            />
          );
        })}

        {status === "authenticated" ? (
          <Button
            onClick={() => signOut({ callbackUrl: "/login" })}
            variant="ghost"
            size="lg"
            className="flex justify-end flex-row-reverse items-center gap-3 text-white text-lg pr-0"
          >
            <LogOut size={32} />
            <span>Logout</span>
          </Button>
        ) : (
          <div className="flex justify-end flex-row-reverse items-center gap-3 text-white text-lg pr-0">
            <LogIn className="text-primary-blue" size={32} />
            <Link href="/login">Login</Link>
          </div>
        )}
      </div>
    </aside>
  );
};

export default MenuAside;
