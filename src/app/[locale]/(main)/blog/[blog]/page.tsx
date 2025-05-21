import { Metadata } from "next";

import prisma from "@/lib/prisma";
import getHour from "@/lib/data/getHour";
import { DAYS as Days } from "@/lib/data/weekDays";

import { Blog, BlogContent } from "@/components/blog";
import { getTranslations } from "next-intl/server";

interface Params {
  params: { blog: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const blog = await prisma.blog.findUnique({
    where: { id: params.blog },
  });

  const t = await getTranslations("CmsPage");

  if (!blog) {
    return {
      title: t("BlogNotFound"),
      description: t("BlogNotFound"),
    };
  }

  return {
    title: blog.title,
    description: blog.content.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany();

  return blogs.map((blog) => ({
    blog: blog.id,
  }));
}

interface PageParams {
  params: { blog: string };
}

export default async function Page({ params }: PageParams) {
  const { blog } = params;

  const currentBlog = await prisma.blog.findUnique({
    where: { id: blog },
  });

  return (
    <div className="flex flex-col gap-4 w-screen items-center justify-center p-12 md:p-24 relative">
      <Blog
        content={<BlogContent content={currentBlog.content} />}
        createdAt={`${getHour(currentBlog.createdAt.getHours())} - ${
          Days[currentBlog.createdAt.getDay()]
        }`}
        title={currentBlog.title}
        path="dynamic"
        image={currentBlog.image}
      />{" "}
    </div>
  );
}
