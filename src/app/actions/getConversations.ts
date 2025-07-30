"use server";

import { getCurrentUser } from "@/lib/session";
import prisma from "@/lib/prisma";
import type { Conversation } from "@prisma/client";

export const getConversations = async (): Promise<{
  conversations: Conversation[];
  status: number;
  message?: string;
}> => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        conversations: [],
        status: 401,
        message: "User not authenticated",
      };
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    return {
      conversations,
      status: 200,
    };
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return {
      conversations: [],
      status: 500,
      message: "Error fetching conversations",
    };
  }
};
