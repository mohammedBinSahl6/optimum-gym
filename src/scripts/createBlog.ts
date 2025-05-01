"use server";

type Blog = {
  content: string;
  title: string;
  email: string;
};

export async function createBlog(blog: Blog) {
  try {
    const dbUser = await prisma.user.findUnique({
      where: { email: blog.email },
    });

    const newBlog = await prisma.blog.create({
      data: {
        title: blog.title,
        content: blog.content,
        authorId: dbUser?.id,
        published: true,
        createdAt: new Date(),
        image: "",
      },
    });

    return { success: true, blog: newBlog };
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, error: "Failed to create blog" };
  }
}
