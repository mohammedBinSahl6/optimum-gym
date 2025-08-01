"use server";

export const deleteConversation = async (conversationId: string) => {
  try {
    const conversation = await prisma.conversation.delete({
      where: {
        id: conversationId,
      },
    });

    return {
      message: "Conversation deleted successfully",
      conversation,
      status: 200,
    };
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return {
      message: "Error deleting conversation",
      status: 500,
    };
  }
};
