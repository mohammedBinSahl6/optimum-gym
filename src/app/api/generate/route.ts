import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { coachRules } from "@/lib/data/coachRules";

export async function POST(req: NextRequest) {
  try {
    const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
    const data = await req.json();

    const prompt = `${coachRules}\n\nUser: ${data.body}\nAI:`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();

    return NextResponse.json({ output });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e });
  }
}
