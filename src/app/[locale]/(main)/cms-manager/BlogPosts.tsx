"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

import { useParams } from "next/navigation";

import { toast } from "sonner";

import { createBlog } from "@/scripts/createBlog";

import { Blog as BlogType } from "@prisma/client";

import Blog, { BlogProps } from "./Blog";

import { getPathname } from "@/routes";
import BlogDrawer from "./BlogDrawer";
import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";

const BlogPosts = ({ Blogs }: { Blogs: BlogProps[] }) => {
  const [loading, setLoading] = useState(false);
  const { data, update, status } = useSession();
  const [blogs, setBlogs] = useState<BlogProps[]>(Blogs); // initialize with server-side blogs

  const params = useParams();
  const locale = params.locale as string;

  const navigate = getPathname({
    href: "/cms-manager",
    locale: locale,
  });

  console.log(window.location);
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
                if (result.success) {
                  toast.success("Blog created successfully");
                  setBlogs((prevBlogs) => [...prevBlogs, result.blog]);
                  await update();
                } else {
                  toast.error("Failed to create blog");
                }
                setLoading(false);
              }}
              user={data.user}
              key={data.user.id}
            />
            {Blogs.map((blog) => {
              const encryptedKey = crypto.randomUUID();

              return <Blog key={encryptedKey} {...blog} />;
            })}
          </section>
        );
      }
    default:
      return (
        <div className="flex flex-col absolute top-1/2 left-1/2 ">
          <h1 className="text-center self-center text-primary-red font-extrabold text-3xl  transform -translate-x-1/2 -translate-y-1/2">
            You are not an Admin
          </h1>
          <Button
            variant="blue"
            className=" p-4  rounded-md self-start mt-4"
            onClick={() => (window.location.href = navigate)}
          >
            Back
          </Button>
        </div>
      );
  }
};
export default BlogPosts;
