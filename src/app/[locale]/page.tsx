import Image from "next/image";
import { useTranslations } from "next-intl";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  const t = useTranslations("IndexPage");
  return (
    <div className="flex flex-col items-center justify-center h-lvh">
      <Hero />
      <Footer />
    </div>
  );
}
