// /api/chat.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT =
  "You are a professional assistant integrated into a US mortgage web application. Respond clearly and concisely to mortgage-related questions. Politely decline unrelated questions. Do not provide legal or financial advice.";

export default async function handler(req: any, res: any) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body as { message?: string } | undefined;
    const message = (body?.message ?? "").trim();

    if (!message) {
      return res.status(400).json({
        error: "Invalid request body. Expected JSON: { message: string }.",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured.");
      return res.status(500).json({
        error: "Server configuration error. Please try again later.",
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(`${SYSTEM_PROMPT}\n\nUser: ${message}`);

    const reply =
      (result as any)?.response?.text?.() ??
      "I'm sorry, but I wasn't able to generate a response. Please try again.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Error handling Gemini chat request:", error);
    return res.status(500).json({
      error: "An unexpected error occurred while processing your request.",
    });
  }
}