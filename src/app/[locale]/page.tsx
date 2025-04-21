import Image from "next/image";
import { useTranslations } from "next-intl";
import Hero from "@/components/Hero/Hero";

export default function Home() {
  const t = useTranslations("IndexPage");
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-lvh">
      <Hero />
    </div>
  );
}
