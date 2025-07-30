"use client";

import type React from "react";
import { useTranslations } from "next-intl";
import { MessageSquare, Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Conversation } from "@prisma/client";
import { cn } from "@/lib/utils";
import { deleteConversation } from "@/app/actions/deleteConversation";
import { toast } from "sonner";

interface ConversationsListProps {
  conversations: Conversation[];
  selectedConversation: string | null;
  onConversationSelect: (conversationId: string) => void;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

const ConversationsList = ({
  conversations,
  selectedConversation,
  setConversations,
  onConversationSelect,
}: ConversationsListProps) => {
  const t = useTranslations("AICoachPage");

  const handleDeleteConversation = async (
    conversationId: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    try {
      const response = await deleteConversation(conversationId);
      if (response.status === 200) {
        toast.success(response.message);
        setConversations(conversations.filter((c) => c.id !== conversationId));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return t("Today");
    if (diffDays === 2) return t("Yesterday");
    if (diffDays <= 7) return `${diffDays} ${t("DaysAgo")}`;
    return d.toLocaleDateString();
  };

  if (conversations.length === 0) {
    return (
      <div className="p-6 text-center">
        <MessageSquare className="w-12 h-12 text-primary-light mx-auto mb-4" />
        <p className="text-primary-blue/70 text-sm">{t("NoConversations")}</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      <h3 className="text-sm font-semibold text-primary-blue/70 px-2 mb-4">
        {t("RecentConversations")}
      </h3>
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => onConversationSelect(conversation.id)}
          className={cn(
            "group p-4 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md",
            selectedConversation === conversation.id
              ? "bg-gradient-to-r from-primary-blue/10 to-primary-light-blue/10 border border-primary-blue/20"
              : "bg-white/60 hover:bg-white/80 border border-primary-light/20"
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-primary-blue flex-shrink-0" />
                <h4 className="font-medium text-primary-blue truncate">
                  {conversation.title}
                </h4>
              </div>
              <div className="flex items-center gap-2 text-xs text-primary-blue/60">
                <Clock className="w-3 h-3" />
                <span>{formatDate(conversation.updatedAt)}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => handleDeleteConversation(conversation.id, e)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-100 hover:text-red-600 p-1 h-auto"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationsList;
