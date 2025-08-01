"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import {
  Bot,
  Plus,
  MessageSquare,
  Sparkles,
  SidebarClose,
  SidebarOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loader from "@/components/loader/Loader";
import ConversationsList from "./ConversationsList";
import ChatInterface from "./ChatInterface";
import type { Conversation, Message } from "@prisma/client";
import { getConversations } from "@/app/actions/getConversations";
import { getMessages } from "@/app/actions/getMessages";
import { createConversation } from "@/app/actions/createConversation";

const AICoachPage = () => {
  const [selectedConversation, setSelectedConversation] = React.useState<
    string | null
  >(null);
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const { data, status } = useSession();
  const t = useTranslations("AICoachPage");

  React.useEffect(() => {
    // Load conversations on mount
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const response = await getConversations();
      if (response.status === 200) {
        setConversations(response.conversations || []);
      } else {
        console.error("Failed to load conversations:", response.message);
        toast.error("Failed to load conversations");
      }
    } catch (error) {
      console.error("Error loading conversations:", error);
      toast.error("Error loading conversations");
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const response = await getMessages(conversationId);
      if (response.status === 200) {
        setMessages(response.messages || []);
      } else {
        console.error("Failed to load messages:", response.message);
        toast.error("Failed to load messages");
        setMessages([]);
      }
    } catch (error) {
      console.error("Error loading messages:", error);
      toast.error("Error loading messages");
      setMessages([]);
    }
  };

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
    loadMessages(conversationId);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleNewConversation = async () => {
    try {
      const response = await createConversation();
      if (response.status === 200 && response.conversation) {
        setConversations([response.conversation, ...conversations]);
        setSelectedConversation(response.conversation.id);
        setMessages([]);
        setSidebarOpen(false);
      } else {
        console.error("Failed to create conversation:", response.message);
        toast.error("Failed to create conversation");
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
      toast.error("Error creating conversation");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-10 min-h-screen bg-gradient-to-br from-primary-light/20 to-primary-blue/5">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/20 to-primary-blue/5">
      <div className="flex h-screen">
        {/* Sidebar - Conversations List */}
        <div
          className={`${
            !sidebarOpen ? "w-0" : ""
          } lg:translate-x-0 fixed lg:relative z-30 w-80 h-full bg-white/80 backdrop-blur-sm border-r border-primary-light/30 transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-primary-light/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-primary-blue to-primary-light-blue rounded-xl">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-primary-blue">
                    OptiCoach
                  </h1>
                  <p className="text-sm text-primary-blue/70">
                    AI Fitness Assistant
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute right-4 top-4"
                  onClick={() => setSidebarOpen(false)}
                >
                  <SidebarClose />
                </Button>
              </div>

              <Button
                onClick={handleNewConversation}
                className="w-full bg-gradient-to-r from-primary-red to-primary-red/80 hover:from-primary-red/90 hover:to-primary-red/70 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                {t("NewConversation")}
              </Button>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              <ConversationsList
                conversations={conversations}
                selectedConversation={selectedConversation}
                onConversationSelect={handleConversationSelect}
                setConversations={setConversations}
              />
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Chat Area */}
        <div className="w-full flex flex-col min-h-0">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm border-b border-primary-light/30 p-4 lg:p-6 flex-shrink-0 z-40 max-w-4xl w-full mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden border-primary-light hover:bg-primary-light/20 bg-transparent"
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-red to-primary-blue bg-clip-text text-transparent">
                    {t("Greeting")} {data?.user?.firstName}!
                  </h2>
                  <p className="text-primary-blue/70 text-sm md:text-base">
                    {t("WelcomeMessage")}
                  </p>
                </div>
                {!sidebarOpen && (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <SidebarOpen className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-red" />
                <span className="text-sm text-primary-blue/70">AI Powered</span>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="md:pl-20 min-h-0">
            {selectedConversation ? (
              <ChatInterface
                conversationId={selectedConversation}
                messages={messages}
                setMessages={setMessages}
                onUpdateConversations={loadConversations}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="p-6 bg-gradient-to-r from-primary-blue to-primary-light-blue rounded-2xl mb-6">
                  <Bot className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-primary-blue mb-4">
                  {t("WelcomeTitle")}
                </h3>
                <p className="text-primary-blue/70 mb-8 max-w-md">
                  {t("WelcomeDescription")}
                </p>
                <Button
                  onClick={handleNewConversation}
                  className="bg-gradient-to-r from-primary-red to-primary-red/80 hover:from-primary-red/90 hover:to-primary-red/70 text-white rounded-xl px-8 py-3 font-medium transition-all duration-200 hover:shadow-lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {t("StartFirstConversation")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoachPage;
