"use server";

import prisma from "@/lib/prisma";

export async function getPublishedSessions() {
  try {
    const sessions = await prisma.session.findMany({
      where: {
        published: true,
      },
    });
    return sessions;
  } catch (error) {
    console.log(error);
    return [];
  }
}
