"use server";

import { getCurrentUser } from "@/lib/session";
import { AIMessageAuthor, Conversation, Message } from "@prisma/client";
import prisma from "@/lib/prisma";

export const createMessage = async (
  message: string,
  author: string,
  conversationId: string
): Promise<{
  message: string;
  newMessage: Message | null;
  status: number;
  conversation: Conversation | null;
}> => {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return {
        message: "User not authenticated",
        newMessage: null,
        status: 401,
        conversation: null,
      };
    }

    let conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        userId: currentUser.id,
      },
    });

    // If conversation doesn't exist, create a new one
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          title: "New Conversation",
          userId: currentUser.id,
        },
      });
    }

    // Create the message
    const newMessage = await prisma.message.create({
      data: {
        content: message,
        author: author as AIMessageAuthor,
        conversationId: conversation.id,
        userId: currentUser.id,
      },
    });

    return {
      message: "Message created successfully",
      conversation,
      newMessage,
      status: 200,
    };
  } catch (error) {
    console.error("Error creating message:", error);
    return {
      message: "Error creating message",
      status: 500,
      conversation: null,
      newMessage: null,
    };
  }
};
