import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import moment from "moment/moment";

export async function POST(request) {
  const { question, answer, transcript, mockId } = await request.json();
  const user = await currentUser();
  const feedbackPrompt = `Question:${question} Answer:${answer} User Answer:${transcript} based on the actual ans the ans the user ans give the rating to the user based on 10 also give the feedback as the area of improvement if any in just 3-5 lines in JSON format `;

  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: feedbackPrompt,
    });

    const finalResponse = text.replace("```json", "").replace("```", "");
    const jsonResponse = JSON.parse(finalResponse);

    const dbResponse = await db
      .insert(UserAnswer)
      .values({
        mockId: mockId,
        question: question,
        correctAns: answer,
        userAns: transcript,
        feedback: jsonResponse?.feedback,
        rating: jsonResponse?.rating,
        userEmail: user?.emailAddresses[0]?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      })
      .returning({ mockId: MockInterview.mockId });

    return NextResponse.json(
      { output: jsonResponse, res: dbResponse },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
