import { BlogPosts, BlogContent } from "@/components/blog";

import getHour from "@/lib/data/getHour";
import { DAYS as Days } from "@/lib/data/weekDays";

const Page = async () => {
  const blogs = await prisma.blog.findMany();

  return (
    <>
      <BlogPosts
        Blogs={blogs.map((blog) => ({
          image: blog.image,
          description: blog.id,
          content: <BlogContent content={blog.content} />,
          title: blog.title,
          path: "all",
          createdAt: `${getHour(blog.createdAt.getHours())} - ${
            Days[blog.createdAt.getDay()]
          }`,
        }))}
      />
    </>
  );
};

export default Page;
