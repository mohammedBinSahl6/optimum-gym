"use client";

import {
  Home,
  Users,
  Bot,
  Activity,
  Settings,
  Table,
  Dumbbell,
  Airplay,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Link } from "@/i18n/routes";

export default function DashboardAside() {
  const { data } = useSession();
  const t = useTranslations("Navigation");
  const mainLinks = [
    { href: "/dashboard", icon: Table, label: t("Dashboard") },
    { href: "/coaching", icon: Activity, label: t("Coaching") },
    { href: "/new-users", icon: Users, label: t("NewUsers") },
    { href: "/sessions", icon: Dumbbell, label: t("Sessions") },
    {
      href: "/cms-manager",
      icon: Airplay,
      label: t("CMS"),
    },
    { href: "/ai-coach", icon: Bot, label: t("AICoach"), highlight: true },
  ];

  const bottomLinks = [
    { href: "/setting", icon: Settings, label: t("Settings") },
    { href: "/", icon: Home, label: t("Home") },
  ];

  return (
    <TooltipProvider>
      <aside className="fixed bottom-0 left-0 md:pt-32 overflow-auto md:overflow-hidden z-10 md:z-10 w-lvw h-20 md:h-lvh md:w-20 md:flex-col border-r bg-gradient-to-b from-primary-red to-primary-blue flex justify-center items-center">
        <nav className="flex md:flex-col items-center gap-6 px-2 md:py-6">
          {/* Main Navigation Links */}
          {mainLinks.filter((link) => {
            if (data?.user?.role !== "ADMIN" && link.href === "/cms-manager") {
              return false;
            }
            return true;
          }). map((link, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div>
                  <Link href={link.href}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-12 w-12 rounded-full text-white hover:bg-white/20 hover:text-white ${
                        link.highlight
                          ? "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg hover:from-cyan-500 hover:to-blue-600"
                          : "bg-white/5"
                      }`}
                    >
                      <link.icon className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{link.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>

        {/* Bottom Settings/home */}
        <nav className="mt-auto flex md:flex-col items-center gap-4 px-2 py-4">
          {bottomLinks.map((link, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div>
                  <Link href={link.href}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full bg-white/5 text-white hover:bg-white/20 hover:text-white"
                    >
                      <link.icon className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{link.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </aside>
    </TooltipProvider>
  );
}
