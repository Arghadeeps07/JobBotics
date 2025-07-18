import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from "next/server";


export async function POST(request) {
  const { prompt } = await request.json();

  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: prompt
    });

    
    console.log(text);
    

    return  NextResponse.json(({ output: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}

