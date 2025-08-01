"use client";

import { useTranslations } from "next-intl";

export default function Error({ error }: { error: Error }) {
  const t = useTranslations("CmsPage");
  return (
    <div className="flex flex-col gap-4 w-screen items-center justify-center p-12 md:p-24">
      <h1 className="text-4xl font-bold">{t("Error")}</h1>
      <p>{error.message}</p>
    </div>
  );
}
