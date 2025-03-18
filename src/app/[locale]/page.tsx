import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("IndexPage");
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-lvh">
      {t("title")}
      {t("description")}
      <Image src="/assets/logo.svg" alt="Logo" width={128} height={128} />
    </div>
  );
}
