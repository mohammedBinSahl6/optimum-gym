"use server";

import prisma from "@/lib/prisma";

export async function getSessionsCMS() {
  try {
    const sessions = await prisma.session.findMany();
    return sessions;
  } catch (error) {
    console.log(error);
    return [];
  }
}
