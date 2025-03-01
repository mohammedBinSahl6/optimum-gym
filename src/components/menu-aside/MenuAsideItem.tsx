import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface MenuAsideItemProps {
  activePath: boolean;
  label: string;
  href: string;
  icon: React.ReactNode;
}
const MenuAsideItem = ({
  activePath,
  icon,
  href,
  label,
}: MenuAsideItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "text-primary-blue text-lg flex items-center gap-3 justify-between hover:text-primary-light-blue",
        {
          "text-primary-light-blue underline": activePath,
        }
      )}
    >
      {label}
      {icon}
    </Link>
  );
};

export default MenuAsideItem;
