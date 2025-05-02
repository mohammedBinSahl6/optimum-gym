"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "@/routes";
import { useTranslations } from "next-intl";

export interface BlogProps {
  title: string;
  subtitle: string;
  content: string;
  handleRemove?: (e: React.MouseEvent<SVGElement>) => void;
  description?: string;
  image?: string;
  path: "dynamic" | "all";
}

const Blog = ({
  content,
  subtitle,
  title,
  handleRemove,
  description,
  image,
  path,
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
    <>
      <section className="flex flex-col border-primary-blue border-2 shadow-sm gap-8 w-full md:w-1/2 md:text-xl relative">
        {image && (
          <img
            src={image}
            alt="Blog post image"
            className="w-full h-64  object-cover"
          />
        )}
        {path === "all" ? (
          <X
            onClick={handleRemove}
            size={32}
            className="cursor-pointer text-primary-blue hover:text-primary-red absolute top-4 right-4"
            data-id={description}
          />
        ) : null}
        <div className="flex flex-col gap-4 p-4">
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
    </>
  );
};

export default Blog;
