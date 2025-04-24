"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Blog = {
  content: string;
  title: string;
  authorId: string;
};

export async function createBlog(blog: Blog) {
  try {
    const newBlog = await prisma,blog.create({
      data: {
        title: blog.title,
        content: blog.content,
        authorId: blog.authorId,
        published: true,
      },
    });
    return { success: true, blog: newBlog };
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, error: "Failed to create blog" };
  }
}
