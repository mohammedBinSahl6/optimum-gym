"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import remarkGfm from "remark-gfm";
import { useSession } from "next-auth/react";
import { Bot, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/components/loader/Loader";
import { useTypewriter } from "@/hooks/useTypewriter";

const AICoachPage = () => {
  const [prompt, setPrompt] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { data } = useSession();

  const t = useTranslations("AICoachPage");

  const randomPlaceholder = React.useMemo(() => {
    const placeholder = [
      t("CoachPlaceholders.0"),
      t("CoachPlaceholders.1"),
      t("CoachPlaceholders.2"),
      t("CoachPlaceholders.3"),
      t("CoachPlaceholders.4"),
      t("CoachPlaceholders.5"),
      t("CoachPlaceholders.6"),
      t("CoachPlaceholders.7"),
      t("CoachPlaceholders.8"),
    ];
    return placeholder[Math.floor(Math.random() * 8)];
  }, [t]);

  const typedOutput = useTypewriter(output, 1); // Add this line


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
        {`${t("Greeting")} ${data?.user.firstName}!`}
      </h2>{" "}
      <div className="w-full max-w-3xl min-h-[10vh] p-10">
        {loading ? (
          <Loader size="lg" />
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{typedOutput || ''}</ReactMarkdown>
        )}
      </div>
      <section className="w-full fixed bottom-0 right-0 flex justify-center items-center p-10">
        <div className="w-full max-w-3xl flex gap-4 items-center mt-auto">
          <Textarea
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={randomPlaceholder}
            className="w-full"
          />
          <Button onClick={handleSubmit} disabled={!prompt.trim() || loading}>
            <Sparkles />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AICoachPage;
