"use client";
import { useState } from "react";
import Blog, { BlogProps } from "./Blog";
import BlogDrawer from "./BlogDrawer";
import { getPathname } from "@/routes";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import { createBlog } from "@/scripts/createBlog";
import { toast } from "sonner";

const BlogPosts = ({ Blogs }: { Blogs: BlogProps[] }) => {
  const [loading, setLoading] = useState(false);
  const { data, status } = useSession();

  const params = useParams();
  const locale = params.locale as string;

  const navigate = getPathname({
    href: "/dashboard",
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
          <section>
            <BlogDrawer
              loading={loading}
              onSubmit={async (e) => {
                setLoading(true);
                const result = await createBlog({
                  content: e.content,
                  title: e.title,
                  authorId: data.user.id,
                });
                if (result.success) {
                  toast.success("Blog created successfully");
                } else {
                  toast.error("Failed to create blog");
                }
                setLoading(false);
              }}
              user={data.user}
              key={data.user.id}
            />
            {Blogs.map((blog) => (
              <Blog key={blog.title} {...blog} />
            ))}
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
