import { db } from "@/utils/db";
import { chapterNotesTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const {courseId, studyType} = await req.json();
  if(studyType == 'notes'){
    const notes = await db.select().from(chapterNotesTable)
    .where(eq(chapterNotesTable?.courseId, courseId));

    const result = {
        notes:notes,
        flashcard:null,
        quize:null,
        qa:null
    }
    return NextResponse.json(result);
  }
}