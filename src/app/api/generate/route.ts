import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { coachRules } from "@/lib/data/coachRules";

interface Message {
  content: string;
  author: "USER" | "AI";
}

export async function POST(req: NextRequest) {
  try {
    const { body, conversationId, messages } = await req.json();

    if (!body || !conversationId) {
      return NextResponse.json(
        { error: "Missing required fields: body and conversationId" },
        { status: 400 }
      );
    }

    const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Build conversation history
    let conversationHistory = "";
    if (messages && messages.length > 0) {
      conversationHistory = messages
        .map((msg: Message) => `${msg.author === "USER" ? "User" : "AI"}: ${msg.content}`)
        .join("\n");
    }

    // Construct the full prompt with conversation history
    const fullPrompt = `${coachRules}

${conversationHistory ? `Previous conversation:\n${conversationHistory}\n\n` : ""}User: ${body}
AI:`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const output = response.text();

    if (!output) {
      return NextResponse.json(
        { error: "Failed to generate response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      output,
      conversationId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error in generate API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
