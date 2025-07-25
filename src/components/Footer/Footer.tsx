import { Home, Bot, Table } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Navigation");

  const Links = [
    { href: "/", icon: Home, label: t("Home") },
    { href: "/dashboard", icon: Table, label: t("Dashboard") },
    { href: "/ai-coach", icon: Bot, label: t("AICoach"), highlight: true },
  ];

  return (
    <footer className="bg-[#011936] text-white py-10 w-full">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex-1 flex justify-center md:justify-start items-center">
          <Image
            src="/assets/logo.svg"
            alt="Optimum Gym Logo"
            width={120}
            height={50}
            priority
          />
        </div>

        <div className="flex-1 flex justify-center items-center space-x-6">
          <Link href="#">
            <Image
              src="/assets/instagram.svg"
              alt="Instagram"
              width={30}
              height={30}
              className="filter invert"
            />
          </Link>
          <Link href="#">
            <Image
              src="/assets/mail.svg"
              alt="Email"
              width={35}
              height={35}
              className="filter invert"
            />
          </Link>
          <Link href="#">
            <Image
              src="/assets/facebook.svg"
              alt="Facebook"
              width={35}
              height={35}
              className="filter invert"
            />
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center md:justify-end items-end">
          {Links.map(({ href, label }, index) => (
            <Link key={index} href={href} className="py-1">
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center text-sm font-semibold text-white">
        OPTIMUM-GYM.COM: 2025
      </div>
    </footer>
  );
}
