"use server";

type Blog = {
  content: string;
  title: string;
  email: string;
  image?: string;
};

export async function createBlog(blog: Blog) {
  try {
    const dbUser = await prisma.user.findUnique({
      where: { email: blog.email },
    });

    const newBlog = await prisma.blog.create({
      data: {
        id: crypto.randomUUID(),
        title: blog.title,
        content: blog.content,
        authorId: dbUser?.id,
        published: true,
        createdAt: new Date(),
        image: blog.image,
      },
    });
    console.log(newBlog);
    return {
      success: true,
      blog: {
        title: newBlog.title,
        createdAt: newBlog.createdAt.toString(),
        content: newBlog.content,
        description: newBlog.id,
        image: newBlog.image,
      },
    };
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, error: "Failed to create blog" };
  }
}
