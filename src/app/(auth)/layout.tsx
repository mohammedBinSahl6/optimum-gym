import type { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = {
  title: "Optimum Gym",
  description: "A gym system for tracking progress, coaching, and competing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
