"use server";

import { getCurrentUser } from "@/lib/session";
import prisma from "@/lib/prisma";
import type { Conversation } from "@prisma/client";

export const createConversation = async (): Promise<{
  message: string;
  conversation: Conversation | null;
  status: number;
}> => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        message: "User not authenticated",
        conversation: null,
        status: 401,
      };
    }

    const newConversation = await prisma.conversation.create({
      data: {
        title: "New Conversation",
        userId: currentUser.id,
      },
    });

    return {
      message: "Conversation created successfully",
      conversation: newConversation,
      status: 200,
    };
  } catch (error) {
    console.error("Error creating conversation:", error);
    return {
      message: "Error creating conversation",
      status: 500,
      conversation: null,
    };
  }
};
