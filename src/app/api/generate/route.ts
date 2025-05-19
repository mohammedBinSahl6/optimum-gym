import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { coachRules } from "@/lib/data/coachRules";

export async function POST(req: NextRequest) {
  try {
    const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });
    const data = await req.json();

    const prompt = `${coachRules}\n\nUser: ${data.body}\nAI:`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const output = response.text();

    return NextResponse.json({ output });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e });
  }
}
