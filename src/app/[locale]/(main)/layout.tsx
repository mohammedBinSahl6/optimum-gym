import type { Metadata } from "next";

import "../globals.css";
import { getCurrentUser } from "@/lib/session";
import { Toaster } from "@/components/ui/sonner";
import { redirect } from "@/i18n/routes";
import DashboardAside from "@/components/dashboard-aside/DashboardAside";

export const metadata: Metadata = {
  title: "Optimum Gym",
  description: "A gym system for tracking progress, coaching, and competing.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect({ href: "/login", locale: "en" });
  }

  return (
    <main>
      <DashboardAside />
      {children}
      <Toaster />
    </main>
  );
}
