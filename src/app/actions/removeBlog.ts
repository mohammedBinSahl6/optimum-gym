"use server";

import { redirect } from "next/navigation";

export async function removeBlog(blogId: string) {
  try {
    const deletedBlog = await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });
    return { success: true, blog: deletedBlog };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false, error: "Failed to delete blog" };
  }
}

export async function deleteAndRedirect(id: string, route: string) {
  const result = await removeBlog(id);

  if (result.success) {
    redirect(`${route}`);
  } else {
    throw new Error("Failed to delete blog.");
  }
}
