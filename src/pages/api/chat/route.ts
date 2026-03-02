/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT =
  "You are a professional assistant integrated into a US mortgage web application. Respond clearly and concisely to mortgage-related questions. Politely decline unrelated questions. Do not provide legal or financial advice.";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null) as
      | { message?: string }
      | null;

    const message = (body?.message ?? "").trim();

    if (!message) {
      return NextResponse.json(
        {
          error: "Invalid request body. Expected JSON: { message: string }.",
        },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured.");
      return NextResponse.json(
        { error: "Server configuration error. Please try again later." },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(
      `${SYSTEM_PROMPT}\n\nUser: ${message}`,
    );

    const reply =
      (result as any)?.response?.text?.() ??
      "I'm sorry, but I wasn't able to generate a response. Please try again.";

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    console.error("Error handling Gemini chat request:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 },
    );
  }
}

