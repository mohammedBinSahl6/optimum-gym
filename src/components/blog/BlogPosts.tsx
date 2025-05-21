"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { createBlog } from "@/app/actions/createBlog";
import { deleteAndRedirect } from "@/app/actions/removeBlog";
import { updateBlog } from "@/app/actions/updateBlog";

import Loader from "@/components/loader/Loader";
import { Button } from "@/components/ui/button";
import BlogDrawer from "./BlogDrawer";
import Blog, { BlogProps } from "./Blog";
import BlogContent from "./BlogContent";

import { BlogFormProvider, useBlogForm } from "@/app/context/BlogFormContext";
import { getPathname } from "@/i18n/routes";
import { User } from "@prisma/client";
import { z } from "zod";
import formSchema from "@/lib/zod/blog";

type Props = { Blogs: BlogProps[] };

interface AdminBlogManagerProps {
  initialBlogs: BlogProps[];
  navigate: string;
  userName: string;
  userEmail: string;
  userId: string;
}
const AdminBlogManager = ({
  initialBlogs,
  navigate,

  userEmail,
  userId,
  userName,
}: AdminBlogManagerProps) => {
  const { richTextValue, uploadedImage, drawerVariant, setDrawerVariant } =
    useBlogForm();

  const [blogs, setBlogs] = useState<BlogProps[]>(initialBlogs);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const t = useTranslations("CmsPage");

  const [loading, setLoading] = useState(false);

  const handleCreateBlog = async (vals: { title: string }) => {
    setLoading(true);
    const result = await createBlog({
      content: richTextValue,
      title: vals.title,
      email: userEmail,
      image: uploadedImage,
    });

    if (result.success && result.blog) {
      toast.success(t("BlogCreated"));
      setBlogs((prev) => [
        ...prev,
        {
          ...result.blog,
          path: "all",
          subtitle: "",
          image: result.blog.image,
          content: <BlogContent content={result.blog.content} />,
          handleRemove: async () => {
            const id = result.blog.description;
            if (!id) return;
            setBlogs((p) => p.filter((b) => b.description !== id));
            await deleteAndRedirect(id, navigate);
          },
        },
      ]);
    } else {
      toast.error(t("BlogCreateFailed"));
    }
    setLoading(false);
  };

  const handleUpdateBlog = async (
    userId: string,
    vals: z.infer<typeof formSchema>
  ) => {
    setEditDrawerOpen(true);
    setLoading(true);

    const result = await updateBlog(vals.title, {
      content: vals.content,
      title: vals.title,
      image: vals.image,
      subtitle: vals.subtitle,
    });
    if (result === "success") {
      toast.success(t("BlogUpdated"));
    } else {
      toast.error(t("BlogUpdateFailed"));
    }
    setLoading(false);
  };

  const { handleUpload } = useBlogForm();

  return (
    <section className="flex flex-col gap-4 items-center justify-center p-1 md:p-24">
      <BlogDrawer
        open={editDrawerOpen}
        variant={drawerVariant}
        loading={loading}
        onSubmit={(vals: z.infer<typeof formSchema>) => {
          drawerVariant == "create"
            ? handleCreateBlog({
                title: vals.title,
              }) &&
              handleUpload({
                fullName: userName,
                user: {
                  id: userId,
                },
                userBlogCount: blogs.length,
              })
            : handleUpdateBlog(userId, {
                ...vals,
              });
        }}
        user={{ id: userId } as User}
      />

      {blogs.map((blog) => (
        <Blog
          key={blog.description}
          handleUpdate={() => {
            setEditDrawerOpen(true);
            setDrawerVariant("edit");
          }}
          {...blog}
          image={blog.image}
          path="all"
          createdAt={blog.createdAt}
          handleRemove={async () => {
            setBlogs((p) =>
              p.filter((b) => b.description !== blog.description)
            );
            await deleteAndRedirect(blog.description, navigate);
          }}
        />
      ))}
    </section>
  );
};

const BlogPosts = ({ Blogs }: Props) => {
  const { status, data } = useSession();
  const params = useParams();
  const locale = params.locale as string;
  const navigate = getPathname({ href: "/cms-manager", locale });
  const t = useTranslations("CmsPage");

  if (status === "unauthenticated") {
    return <h1 className="text-center">{t("NotAuthenticated")}</h1>;
  }
  if (status === "loading") {
    return <Loader size="lg" />;
  }
  if (data.user.role !== "ADMIN") {
    return (
      <div className="flex flex-col absolute top-1/2 left-1/2">
        <h1 className="text-center self-center text-primary-red font-extrabold text-3xl transform -translate-x-1/2 -translate-y-1/2">
          {t("NotAdmin")}
        </h1>
        <Button
          variant="blue"
          className="p-4 rounded-md self-start mt-4"
          onClick={() => (window.location.href = navigate)}
        >
          {t("Back")}
        </Button>
      </div>
    );
  }

  return (
    <BlogFormProvider>
      <AdminBlogManager
        initialBlogs={Blogs}
        navigate={navigate}
        userEmail={data.user.email}
        userName={data?.user?.fullName}
        userId={data.user.id}
      />
    </BlogFormProvider>
  );
};

export default BlogPosts;
