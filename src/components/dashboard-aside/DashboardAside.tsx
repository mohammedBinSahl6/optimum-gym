import { Link } from "@/routes";
import React from "react";

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
  return (
    <aside className="hidden md:flex pt-40 w-full md:w-72 bg-primary-light fixed top-0 left-0 h-screen flex-col items-center gap-10">
      {dashboardAsideLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="flex items-center justify-between font-bold text-sm text-primary-red hover:text-primary-blue transition-all"
        >
          {link.name}
        </Link>
      ))}
    </aside>
  );
};

export default DashboardAside;
