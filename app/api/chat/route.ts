import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// POST /api/chat — server-side Gemini proxy
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
      config: {
        systemInstruction:
          "You are 'Geno', an expert gaming hardware specialist for ReGeno India. You help users find the perfect refurbished gaming console or retro gear. Be friendly, knowledgeable about both retro (GameCube, PS2) and modern (Xbox Series X, Switch) systems, and emphasize ReGeno's quality checks and 6-month warranty. Keep answers concise and relevant to the Indian gaming market. Read this website and use it to answer questions and if there is a lack of information on the website, use your knowledge to answer the question. Also send the user a message that I will give you further updates to your knowledge base in the future, so if you dont have the information right now, just let the user know that you will be able to answer that question in the future when you get the update. Also make sure to ask the user follow up questions to better understand their needs and preferences.",
      },
    });

    return NextResponse.json({ response: response.text });
  } catch (error) {
    console.error("POST /api/chat error:", error);
    return NextResponse.json(
      {
        response:
          "Sorry, I'm having trouble connecting to my gaming database right now. How else can I help you find some gear?",
      },
      { status: 500 }
    );
  }
}
