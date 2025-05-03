"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/routes";

import { Button } from "@/components/ui/button";
import CustomAlertDialog from "./CustomAlertDialog";
export interface BlogProps {
  title: string;
  subtitle: string;
  content: string;
  path: "dynamic" | "all";
  description?: string;
  image?: string;
  children?: React.ReactNode;
  handleRemove?: (e: string) => void;
}

const Blog = ({
  content,
  subtitle,
  title,
  handleRemove,
  description,
  image,
  path,
  children,
}: BlogProps) => {
  const [expand, setExpand] = useState(false);
  const handleExpandContent = () => setExpand(!expand);
  const router = useRouter();
  const t = useTranslations("CmsPage");

  const handleNavigateToPath = () => {
    router.push(`/cms-manager/${description}`);
  };

  const handleNavigateToAll = () => {
    router.push(`/cms-manager`);
  };

  return (
    <section className="relative flex flex-col-reverse items-center justify-center p-4 md:p-12 w-full md:w-2/3 ">
      <section className="flex flex-col border-primary-blue border-2 shadow-sm gap-8 w-full  md:text-xl relative order-3">
        {image && (
          <Image
            width={500}
            height={500}
            src={image}
            alt="Blog post image"
            className="w-full h-64  object-cover"
          />
        )}

        <div className="flex flex-col gap-4 p-4 max-w-[90%] text-left:">
          <h1 className="text-4xl">{title}</h1>
          <h4>{subtitle}</h4>
          <Button
            className="self-start"
            variant="ghost"
            onClick={handleExpandContent}
          >
            {expand ? t("less") : t("readmore")}
          </Button>
        </div>
        {expand && <p className="p-8 text-primary-blue">{content}</p>}
      </section>
      {path == "all" ? (
        <Button variant="link" onClick={() => handleNavigateToPath()}>
          {t("navigate")}
        </Button>
      ) : (
        <Button variant="link" onClick={() => handleNavigateToAll()}>
          {t("return")}
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
