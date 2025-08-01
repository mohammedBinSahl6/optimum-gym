"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Bot, User, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTypewriter } from "@/hooks/useTypewriter";
import type { Message } from "@prisma/client";
import { cn } from "@/lib/utils";
import { updateConversationTitle } from "@/app/actions/updateConversationTitle";
import { createMessage } from "@/app/actions/createMessage";

interface ChatInterfaceProps {
  conversationId: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onUpdateConversations: () => void;
}

const ChatInterface = ({
  conversationId,
  messages,
  setMessages,
  onUpdateConversations,
}: ChatInterfaceProps) => {
  const [prompt, setPrompt] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [streamingMessage, setStreamingMessage] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const t = useTranslations("AICoachPage");

  const typedOutput = useTypewriter(streamingMessage, 30);

  // Auto-resize textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  // Scroll to bottom when messages change
  React.useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // Scroll to bottom during typing animation
  React.useEffect(() => {
    if (streamingMessage && typedOutput.length > 0) {
      scrollToBottom();
    }
  }, [typedOutput, streamingMessage]);

  // Update conversation title when component unmounts
  React.useEffect(() => {
    return () => {
      if (messages.length > 0) {
        updateConversationTitle(conversationId).catch(console.error);
      }
    };
  }, [conversationId, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!prompt.trim() || loading) return;

    const userMessage = prompt.trim();
    setPrompt("");
    setLoading(true);
    setStreamingMessage("");

    try {
      // Save user message to database
      const userMessageResponse = await createMessage(
        userMessage,
        "USER",
        conversationId
      );

      if (
        userMessageResponse?.status !== 200 ||
        !userMessageResponse.newMessage
      ) {
        throw new Error("Failed to save user message");
      }

      // Add user message to local state
      setMessages((prev) => [...prev, userMessageResponse.newMessage]);

      // Get AI response
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: userMessage,
          conversationId,
          messages: messages.map((m) => ({
            content: m.content,
            author: m.author,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const aiResponse = await response.json();

      if (!aiResponse.output) {
        throw new Error("No AI response received");
      }

      // Show streaming message
      setStreamingMessage(aiResponse.output);

      // Save AI message to database
      const aiMessageResponse = await createMessage(
        aiResponse.output,
        "AI",
        conversationId
      );

      if (aiMessageResponse?.status !== 200 || !aiMessageResponse.newMessage) {
        throw new Error("Failed to save AI message");
      }

      // Wait for typing animation to complete, then add to messages
      const animationDuration = Math.max(aiResponse.output.length * 30, 1000); // 30ms per character, minimum 1 second
      
      setTimeout(() => {
        setMessages((prev) => [...prev, aiMessageResponse.newMessage]);
        setStreamingMessage("");
        onUpdateConversations();
      }, animationDuration);

    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(t("ErrorSendingMessage"));
      setStreamingMessage("");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-6 space-y-6 min-h-0">
        {messages.length === 0 && !streamingMessage && (
          <div className="text-center py-12">
            <div className="p-4 bg-gradient-to-r from-primary-blue/10 to-primary-light-blue/10 rounded-2xl inline-block mb-4">
              <Bot className="w-12 h-12 text-primary-blue" />
            </div>
            <h3 className="text-xl font-semibold text-primary-blue mb-2">
              {t("StartConversation")}
            </h3>
            <p className="text-primary-blue/70 max-w-md mx-auto">
              {t("CoachPlaceholder")}
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={`${message.id}-${index}`}
            className={cn(
              "flex gap-4 w-full max-w-4xl",
              message.author === "USER" ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                message.author === "USER"
                  ? "bg-gradient-to-r from-primary-red to-primary-red/80"
                  : "bg-gradient-to-r from-primary-blue to-primary-light-blue"
              )}
            >
              {message.author === "USER" ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>
            <div
              className={cn(
                "flex-1 p-4 rounded-2xl shadow-sm min-w-0 max-w-[85%] lg:max-w-[75%]",
                message.author === "USER"
                  ? "bg-gradient-to-r from-primary-red/10 to-primary-red/5 border border-primary-red/20"
                  : "bg-white/80 backdrop-blur-sm border border-primary-light/30"
              )}
            >
              <div className="prose prose-sm max-w-none break-words overflow-hidden">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
              <div className="text-xs text-primary-blue/50 mt-2">
                {formatTime(message.createdAt)}
              </div>
            </div>
          </div>
        ))}

        {/* Streaming AI Response */}
        {streamingMessage && (
          <div className="flex gap-4 w-full max-w-4xl mr-auto">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary-blue to-primary-light-blue flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-primary-light/30 shadow-sm min-w-0 max-w-[85%] lg:max-w-[75%]">
              <div className="prose prose-sm max-w-none break-words overflow-hidden">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {typedOutput}
                </ReactMarkdown>
              </div>
              {typedOutput.length < streamingMessage.length && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse" />
                  <span className="text-xs text-primary-blue/70">
                    {t("AITyping")}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-primary-light/30 bg-white/80 backdrop-blur-sm p-4 lg:p-6 flex-shrink-0">
        <div className="flex gap-4 items-end max-w-4xl mx-auto">
          <div className="flex-1 min-w-0">
            <Textarea
              ref={textareaRef}
              rows={1}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("TypeMessage")}
              className="min-h-[48px] max-h-32 resize-none border-primary-light/50 focus:border-primary-blue focus:ring-primary-blue/20 rounded-xl w-full"
              disabled={loading}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!prompt.trim() || loading}
            className="bg-gradient-to-r from-primary-blue to-primary-light-blue hover:from-primary-blue/90 hover:to-primary-light-blue/90 text-white rounded-xl p-3 transition-all duration-200 hover:shadow-lg disabled:opacity-50 flex-shrink-0"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
        <div className="text-xs text-primary-blue/50 text-center mt-2">
          {t("PressEnterToSend")} • {t("ShiftEnterNewLine")}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
