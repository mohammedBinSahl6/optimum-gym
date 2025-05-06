import getHour from "@/lib/data/getHour";
import { DAYS as Days } from "@/lib/data/weekDays";
import BlogPosts from "./BlogPosts";
import BlogContent from "./BlogContent";

const Page = async () => {
  const blogs = await prisma.blog.findMany();

  return (
    <BlogPosts
      Blogs={blogs.map((blog) => ({
        image: blog.image,
        description: blog.id,
        content: <BlogContent content={blog.content} />,
        title: blog.title,
        path: "all",
        subtitle: `${getHour(blog.createdAt.getHours())} - ${
          Days[blog.createdAt.getDay()]
        }`,
      }))}
    />
  );
};

export default Page;
