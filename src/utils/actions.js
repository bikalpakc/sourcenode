"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function checkPatent(formData) {
  const idea = formData.get("idea");

  if (!idea || typeof idea !== "string") {
    throw new Error("Please provide an idea");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const prompt = `Act as a patent expert. Analyze this idea and tell me if similar patents exist. If they do, list them with their patent numbers and brief descriptions. If they don't, explain why this idea might be unique. Here's the idea: ${idea}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return {
      success: true,
      result: text,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to check patents. Please try again.",
    };
  }
}
