import { Metadata } from "next";
import prisma from "@/lib/prisma";

import Blog from "../Blog";
import getHour from "@/lib/data/getHour";
import { DAYS as Days } from "@/lib/data/weekDays";
interface Params {
  params: { blog: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const blog = await prisma.blog.findUnique({
    where: { id: params.blog },
  });

  if (!blog) {
    return {
      title: "Blog not found",
      description: "This blog post could not be found.",
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
        content={currentBlog.content}
        subtitle={`${getHour(currentBlog.createdAt.getHours())} - ${
          Days[currentBlog.createdAt.getDay()]
        }`}
        title={currentBlog.title}
        path="dynamic"
      />{" "}
    </div>
  );
}
