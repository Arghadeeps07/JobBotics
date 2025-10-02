import { db } from "@/utils/db";
import { studyMeteriaTable } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { createdBy } = await req.json();

  const result = await db
    .select()
    .from(studyMeteriaTable)
    .where(eq(studyMeteriaTable.createdBy, createdBy));

  return NextResponse.json({result:result});
}

export async function GET(req) {
  const requrl = req.url;
  const {searchParams} = new URL(requrl);
  const courseId = searchParams?.get('courseId');

  const course = await db.select().from(studyMeteriaTable)
  .where(eq(studyMeteriaTable?.courseId, courseId));

  return NextResponse.json({result:course[0]})
}