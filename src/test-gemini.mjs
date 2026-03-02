import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const SYSTEM_PROMPT =
  "You are a professional assistant integrated into a US mortgage web application. Respond clearly and concisely to mortgage-related questions. Politely decline unrelated questions. Do not provide legal or financial advice.";

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent(
    `${SYSTEM_PROMPT}\n\nUser: Explain fixed vs adjustable-rate mortgages.`
  );

  console.log("Model reply:\n", result.response.text());
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});