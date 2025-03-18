import { LayoutDashboardIcon, User } from "lucide-react";

const navLinks = [
  {
    href: "/profile",
    name: "My Profile",
    icon: <User size={32} />,
  },

  {
    href: "/dashboard",
    name: "Dashboard",
    icon: <LayoutDashboardIcon size={32} />,
  },
];

export default navLinks;
