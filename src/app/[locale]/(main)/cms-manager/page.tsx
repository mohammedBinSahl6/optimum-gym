import getHour from "@/lib/data/getHour";
import BlogPosts from "./BlogPosts";
import { DAYS as Days } from "@/lib/data/weekDays";
import { deleteAndRedirect } from "@/app/actions/removeBlog";
import { getLocale } from "next-intl/server";

const Page = async () => {
  const blogs = await prisma.blog.findMany();
  const locale = await getLocale();

  return (
    <BlogPosts
      Blogs={blogs.map((blog) => ({
        content: blog.content,
        title: blog.title,
        subtitle: `${getHour(blog.createdAt.getHours())} - ${
          Days[blog.createdAt.getDay()]
        }`,
        handleRemove: async () => {
          "use server";
          await deleteAndRedirect(blog.id, locale, "cms-manager");
        },
      }))}
    />
  );
};

export default Page;
