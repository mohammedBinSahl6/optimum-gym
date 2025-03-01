import React from "react";
import { usePathname } from "next/navigation";
import { LogIn, LogOut, X } from "lucide-react";

import MenuAsideItem from "./MenuAsideItem";
import Link from "next/link";

const MenuAside = ({
  setShowMenu,
  isLoggedIn,
  navLinks,
}: {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  navLinks: { name: string; href: string; icon: React.ReactNode }[];
}) => {
  const pathname = usePathname();

  return (
    <div
      onClick={() => setShowMenu(false)}
      className="fixed bg-transparent top-0 left-0 w-full h-lvh z-40"
    >
      <aside
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="w-full md:w-1/4 h-1/2 rounded-b-md bg-white p-10 fixed top-0 left-0 md:left-auto  md:top-36 md:border-black md:border-2 md:border-solid md:right-0 z-50 transition-all animate-slide-in-right"
      >
        <button
          className="absolute top-5 right-5 p-2"
          onClick={() => setShowMenu(false)}
        >
          <X size={48} color="#6900f1ff" />
        </button>
        <div className="flex gap-3 flex-col mt-28 w-36">
          {isLoggedIn &&
            navLinks.map((link) => {
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
          {isLoggedIn ? (
            <div className="flex justify-between flex-row-reverse items-center gap-3 text-primary-blue">
              <LogOut size={32} />
              <span>Logout</span>
            </div>
          ) : (
            <div className="flex justify-between flex-row-reverse items-center gap-3 text-primary-blue">
              <LogIn className="text-primary-blue" size={32} />
              <Link href="/login">Login</Link>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default MenuAside;
