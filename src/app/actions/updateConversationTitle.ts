"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "@/lib/prisma";

export const updateConversationTitle = async (conversationId: string) => {
  try {
    const selectedConversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
          take: 5, // Only use first 5 messages for title generation
        },
      },
    });

    if (!selectedConversation) {
      console.error("Conversation not found");
      return;
    }

    // Only update if title is still "New Conversation" and there are messages
    if (selectedConversation.title === "New Conversation" && selectedConversation.messages.length > 0) {
      const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      const conversationText = selectedConversation.messages
        .map((message) => `${message.author}: ${message.content}`)
        .join("\n");

      const prompt = `Generate a short, descriptive title (max 50 characters) for this fitness coaching conversation. Focus on the main topic or question discussed:

${conversationText}

Title:`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const output = response.text().trim();

      // Clean up the title and ensure it's not too long
      const cleanTitle = output.replace(/^["']|["']$/g, '').substring(0, 50);

      if (cleanTitle && cleanTitle !== "New Conversation") {
        await prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            title: cleanTitle,
          },
        });
        console.log("Conversation title updated successfully:", cleanTitle);
      }
    }
  } catch (error) {
    console.error("Error updating conversation title:", error);
  }
};
