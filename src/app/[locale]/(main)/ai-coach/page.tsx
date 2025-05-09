"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import remarkGfm from "remark-gfm";
import { useSession } from "next-auth/react";
import { Bot, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/components/loader/Loader";

const coachPlaceholders = [
  "Ask me for a workout plan or fitness tip!",
  "How can I help you crush your gym goals today?",
  "Need help with your membership or training routine?",
  "Type here to ask your virtual coach anything fitness-related.",
  "Want exercises for chest day? Just ask!",
  "Hey coach, what’s the best warm-up for leg day?",
  "Looking for a quick home workout? Let me help!",
  "Ask me for gym advice, training tips, or membership help.",
  "Not sure where to start? I can build a plan for you.",
  "Enter your question—your Optimum coach is ready!",
];

const AICoachPage = () => {
  const [prompt, setPrompt] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { data } = useSession();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: prompt }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      toast.error("Something went wrong", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-primary-light md:p-10 p-4">
      <h1 className="text-4xl font-bold flex items-center gap-5">
        {" "}
        <Bot size={50} />
        OPtic Coach
      </h1>
      <h2 className="text-7xl font-black bg-gradient-to-r from-[#011936] to-[#a41623] text-transparent bg-clip-text">
        Hi {data?.user?.firstName}!
      </h2>{" "}
      <div className="w-full max-w-3xl min-h-[40vh] p-10">
        {loading ? (
          <Loader size="lg" />
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{output}</ReactMarkdown>
        )}
      </div>
      <div className="w-full max-w-3xl flex gap-4 items-center">
        <Textarea
          rows={1}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={
            coachPlaceholders[
              Math.floor(Math.random() * coachPlaceholders.length)
            ]
          }
          className="w-full"
        />
        <Button onClick={handleSubmit} disabled={!prompt}>
          <Sparkles />
        </Button>
      </div>
    </div>
  );
};

export default AICoachPage;
