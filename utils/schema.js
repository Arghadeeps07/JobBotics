import { integer } from 'drizzle-orm/gel-core';
import { pgTable, serial, varchar, text, jsonb, boolean, timestamp } from 'drizzle-orm/pg-core';


export const MockInterview=pgTable('mockInterviews', {
    id: serial('id').primaryKey(),
    jsonMockResp: jsonb('jsonMockResp').notNull(),
    jobPosition: text('jobPosition').notNull(),
    jobDesc: text('jobDesc').notNull(),
    jobExperience: text('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    mockId: varchar('mockId').notNull(),

})


export const UserAnswer = pgTable("userAnswer",{
    id: serial('id').primaryKey(),
    mockId: varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    correctAns: text('correctAns'),
    userAns: text('userAns'),
    feedback: text('feedback'),
    rating: varchar('rating').notNull(),
    userEmail:varchar('userEmail').notNull(),
    createdAt:varchar('createdAt').notNull()
} ) 

export const userTable = pgTable('users', {
    id: serial().primaryKey(),
    name:varchar().notNull(),
    email: varchar().notNull(),
    isMember:boolean().default(false)
})


export const studyMeteriaTable = pgTable("studyMaterial", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  topic: varchar("topic").notNull(),
  difficultyLevel: varchar("difficultyLevel").default("Easy"),
  courseLayout: jsonb().notNull(),
  createdBy: varchar("createdBy").notNull(),
  status: varchar("status").default("Generating"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});


export const chapterNotesTable=pgTable('chapterNotes', {
    id:serial().primaryKey(),
    courseId:varchar().notNull(),
    chapterId:integer().notNull(),
    notes:text()
})