import { Metadata } from "next";
import Blog from "../Blog";
import { deleteAndRedirect } from "@/app/actions/removeBlog";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

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
    openGraph: {
      images: [blog.image || "/default.jpg"],
    },
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

  if (!currentBlog)
    return (
      <div className="flex flex-col gap-4 w-screen items-center justify-center p-12 md:p-24">
        <h1>Blog not found</h1>
      </div>
    );

  const headersList = await headers();
  const locale = headersList.get("x-next-locale") || "en";

  return (
    <div className="flex flex-col-reverse gap-4 w-screen items-center justify-center p-12 md:p-24">
      <Blog
        content={currentBlog.content}
        subtitle={currentBlog.createdAt.toString()}
        title={currentBlog.title}
      />
      <form
        className="self-end"
        action={deleteAndRedirect.bind(
          null,
          currentBlog.id,
          locale,
          "cms-manager"
        )}
      >
        <button
          type="submit"
          className="bg-red-500 hover:bg-primary-red text-white px-4 py-2 rounded mt-4"
        >
          Delete Blog
        </button>
      </form>
    </div>
  );
}
