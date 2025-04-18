import Image from "next/image";
import { useTranslations } from "next-intl";
import Quote from "@/components/quote/Quote";

export default function Home() {
  const t = useTranslations("IndexPage");
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-lvh">
      {t("title")}
      {t("description")}
      <Quote />
      <Image src="/assets/logo.svg" alt="Logo" width={128} height={128} />
    </div>
  );
}
