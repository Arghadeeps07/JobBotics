import { db } from "@/utils/db";
import { studyMeteriaTable } from "@/utils/schema";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { courseId, title, difficultyLevel, createdBy } = await req.json();
  const prompt = `
Generate a study material for ${title} for Exam.
Level of difficulty: ${difficultyLevel}.
Output in *valid JSON only*, no code fences, no extra text.
JSON should have:
- summary of course
- list of chapters with summary for each
- topic list in each chapter
No circular references, no functions.
`;

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
      },
      { status: 400 }
    );
  }

  const dbResult = await db
    .insert(studyMeteriaTable)
    .values({
      courseId,
      createdBy,
      difficultyLevel,
      topic: title,
      courseLayout: JSON.stringify(jsonFinalResponse),
    })
    .returning({ id: studyMeteriaTable.createdBy });

  return NextResponse.json({ result: dbResult[0] });
}
