import React from "react";

import { cn } from "@/lib/utils";
import { Link } from "@/routes";
import { Button } from "../ui/button";

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
      className={cn(" hover:text-primary-light-blue", {
        "text-primary-light-blue underline": activePath,
      })}
    >
      <Button
        variant="ghost"
        className="flex justify-end flex-row-reverse items-center gap-3 text-white text-lg pr-0"
        size="lg"
      >
        {icon}
        {label}
      </Button>
    </Link>
  );
};

export default MenuAsideItem;
