"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { createBlog } from "@/scripts/createBlog";

import { getPathname } from "@/routes";
import BlogDrawer from "./BlogDrawer";
import Blog, { BlogProps } from "./Blog";

import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";

import { deleteAndRedirect } from "@/app/actions/removeBlog";

const BlogPosts = ({ Blogs }: { Blogs: BlogProps[] }) => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<BlogProps[]>(Blogs);
  const { data, update, status } = useSession();

  const params = useParams();
  const locale = params.locale as string;

  const navigate = getPathname({
    href: "/cms-manager",
    locale: locale,
  });

  switch (status) {
    case "unauthenticated":
      return <h1 className="text-center">You are not authenticated</h1>;

    case "loading":
      return <Loader size="lg" />;

    case "authenticated":
      if (data.user.role === "ADMIN") {
        return (
          <section className="flex flex-col gap-4 w-screen items-center justify-center p-12 md:p-24">
            <BlogDrawer
              loading={loading}
              onSubmit={async (e) => {
                setLoading(true);
                const result = await createBlog({
                  content: e.content,
                  title: e.title,
                  email: data.user.email,
                });

                if (result.success && result.blog) {
                  toast.success("Blog created successfully");

                  setBlogs((prev) => [
                    ...prev,
                    {
                      ...result.blog,
                      path: "all",
                      handleRemove: async (e) => {
                        const id = e.currentTarget.dataset.id;
                        if (!id) return;

                        setBlogs((prev) =>
                          prev.filter((b) => b.description !== id)
                        );
                        await deleteAndRedirect(id, navigate);
                      },
                    },
                  ]);
                  await update();
                } else {
                  toast.error("Failed to create blog");
                }

                setLoading(false);
              }}
              user={data?.user}
              key={data.user.id}
            />

            {blogs.map((blog) => (
              <Blog
                key={blog.description}
                description={blog.description}
                path="all"
                handleRemove={async (e) => {
                  const id = e.currentTarget.dataset.id;
                  setBlogs((prev) => prev.filter((b) => b.description !== id));
                  await deleteAndRedirect(id, navigate);
                }}
                data-id={blog.description}
                {...blog}
              />
            ))}
          </section>
        );
      }

    default:
      return (
        <div className="flex flex-col absolute top-1/2 left-1/2">
          <h1 className="text-center self-center text-primary-red font-extrabold text-3xl transform -translate-x-1/2 -translate-y-1/2">
            You are not an Admin
          </h1>
          <Button
            variant="blue"
            className="p-4 rounded-md self-start mt-4"
            onClick={() => (window.location.href = navigate)}
          >
            Back
          </Button>
        </div>
      );
  }
};

export default BlogPosts;
