import { db } from "@/utils/db";
import { inngest } from "./client";
import { eq } from "drizzle-orm";
import { chapterNotesTable, studyMeteriaTable, userTable } from "@/utils/schema";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const createNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const result = await step.run(
      "Check user and create new if not in db",
      async () => {
        const { user } = event.data;
        const result = await db
          .select()
          .from(userTable)
          .where(eq(userTable.email, user?.primaryEmailAddress?.emailAddress));

        console.log(result);

        if (result?.length === 0) {
          const userResp = await db
            .insert(userTable)
            .values({
              name: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            })
            .returning({ id: userTable.id });

          return userResp;
        }
        return result;
      }
    );

    return "Success";
  }
);

export const generateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;
    const chapters = course?.courseLayout?.chapters || [];

    await step.run("Generate Chapter Notes", async () => {
      let index = 0;
      for (const chapter of chapters) {
        const prompt = `
          Generate detailed exam material content for each chapter. 
          Include all topic points in the content. 
          Generate the no1tes in such a way that it looks cool and easily readable and also add some emojis
          Provide the output in pure HTML without <html>, <head>, <body>, or <title> tags — only the inner content.
          ${JSON.stringify(chapter)}
        `;

        const { text } = await generateText({
          model: google("gemini-2.5-flash"),
          prompt,
        });

        const dbResponse = await db
          .insert(chapterNotesTable)
          .values({
            chapterId: index,
            courseId: course?.courseId,
            notes: text,
          })
          .returning({ courseId: chapterNotesTable.courseId });

        console.log("Saved chapter:", dbResponse);
        index++;
      }
    });

    await step.run("Update course status result", async () => {
      await db
        .update(studyMeteriaTable)
        .set({ status: "Ready" })
        .where(eq(studyMeteriaTable.courseId, course?.courseId));
      return "Success";
    });
  }
);


// Update status to ready


