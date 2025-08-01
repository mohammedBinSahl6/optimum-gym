"use server";

import prisma from "@/lib/prisma";
import type { Message } from "@prisma/client";

export const getMessages = async (conversationId: string) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      messages,
      status: 200,
    };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return {
      message: "Error fetching messages",
      status: 500,
      messages: [] as Message[],
    };
  }
};
