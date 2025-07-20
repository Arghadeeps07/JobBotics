import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@clerk/nextjs/server";
import moment from "moment/moment";

export async function POST(request) {
  const { prompt, jobrole, jobDescription, yearsOfExperience } =
    await request.json();
  const user = await currentUser();

  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: prompt,
    });

    const finalResponse = text.replace("```json", "").replace("```", "");
    let jsonFinalResponse;
    try {
      jsonFinalResponse = JSON.parse(finalResponse);
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError.message);
      return NextResponse.json(
        {
          success: false,
          message: "Gemini returned invalid JSON.",
          raw: cleanedText,
        },
        { status: 400 }
      );
    }
    console.log(jsonFinalResponse);

    const dbResponse = await db
      .insert(MockInterview)
      .values({
        jsonMockResp: jsonFinalResponse,
        jobPosition: jobrole,
        jobDesc: jobDescription,
        jobExperience: yearsOfExperience,
        createdBy: user?.emailAddresses[0]?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
        mockId: uuidv4(),
      })
      .returning({ mockId: MockInterview.mockId });

    console.log("Inserted ID:", dbResponse);
    const mockId = dbResponse[0]?.mockId;

    return NextResponse.json(
      { output: finalResponse, mockId: mockId },
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
