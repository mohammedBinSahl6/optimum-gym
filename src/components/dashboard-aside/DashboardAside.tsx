"use client";
import React from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Link } from "@/routes";

const dashboardAsideLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Coaching",
    href: "/coaching",
  },
  {
    name: "Sessions",
    href: "/sessions",
  },
  {
    name: "New Users",
    href: "/new-users",
  },
  {
    name: "AI Coach",
    href: "/ai-coach",
  },
];

const DashboardAside = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex pt-40 w-full md:w-72 bg-primary-light fixed top-0 left-0 h-screen flex-col items-center gap-10">
      {dashboardAsideLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={cn(
            "flex items-center justify-between font-bold text-sm text-primary-red hover:text-primary-blue transition-all",
            {
              underline: pathname === link.href,
            }
          )}
        >
          {link.name}
        </Link>
      ))}
    </aside>
  );
};

export default DashboardAside;
