"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import CustomAlertDialog from "@/components/custom-alert/CustomAlertDialog";
import { useRouter } from "@/i18n/routes";

export interface BlogProps {
  title: string;
  createdAt: string;
  content: string | React.ReactNode;
  path: "dynamic" | "all";
  description?: string;
  image?: string;
  children?: React.ReactNode;
  handleRemove?: (e: string) => void;
}

const Blog = ({
  content,
  createdAt,
  title,
  handleRemove,
  description,
  image,
  path,
  children,
}: BlogProps) => {
  const [expand, setExpand] = useState(false);
  const router = useRouter();
  const t = useTranslations("CmsPage");

  const fallBackImage =
    "https://burobiz-a.akamaihd.net/uploads/images/137995/large_%D1%84%D0%B8%D1%82%D0%BA%D0%B0%D1%84%D0%B53.jpg";

  const handleExpandContent = () => setExpand(!expand);

  const handleNavigateToPath = () => {
    router.push(`/cms-manager/${description}`);
  };

  const handleNavigateToAll = () => {
    router.push(`/cms-manager`);
  };

  const ACTIVE_DURATION = 10000;
  useEffect(() => {
    setTimeout(() => {
      if (expand) {
        setExpand(false);
      }
    }, ACTIVE_DURATION);
  }, [expand]);

  return (
    <section className="relative flex flex-col-reverse items-center justify-center p-4 md:p-12 w-full md:w-2/3 ">
      <section className="flex flex-col border-primary-blue border-2 shadow-sm gap-8 w-full  md:text-xl relative order-3 min-h-[553px]">
        <>
          <Image
            width={500}
            height={500}
            src={image ? image : fallBackImage}
            alt="Blog post image"
            className="w-full absolute h-full object-fit bg-black "
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </>

        <div className="flex flex-col gap-4 p-4 max-w-[90%] text-left  text-white z-10">
          <h1 className="text-7xl font-bold capitalize">{title}</h1>
          <h4 className="text-2xl">{createdAt}</h4>
          <Button
            className="self-start absolute bottom-10 z-50  "
            variant="ghost"
            onClick={handleExpandContent}
          >
            {expand ? t("Less") : t("ReadMore")}
          </Button>
        </div>
        {expand && <p className="p-8 z-0 text-white">{content}</p>}
      </section>
      {path == "all" ? (
        <Button variant="link" onClick={() => handleNavigateToPath()}>
          {t("Navigate")}
        </Button>
      ) : (
        <Button variant="link" onClick={() => handleNavigateToAll()}>
          {t("Return")}
        </Button>
      )}

      {path === "all" && (
        <CustomAlertDialog
          key={description}
          onDelete={() => {
            handleRemove(description);
          }}
        />
      )}
      {children}
    </section>
  );
};

export default Blog;
