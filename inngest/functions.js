import { db } from "@/utils/db";
import { inngest } from "./client";
import { eq } from "drizzle-orm";
import { userTable } from "@/utils/schema";

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
        const {user} = event.data;
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

          return userResp
        }
        return result;
      }
    );

    return 'Success';
  }
  
);


export const generateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const result = await step.run(
      "Check user and create new if not in db",
      async () => {
        const {course} = event.data;
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

          return userResp
        }
        return result;
      }
    );

    return 'Success';
  }
  
);

