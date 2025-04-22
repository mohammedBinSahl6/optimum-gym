import type { Metadata } from "next";

import "../globals.css";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

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

  if (user) {
    redirect("/en/dashboard");
  }

  return (
    <main>
      {children}
      <Toaster />
    </main>
  );
}
