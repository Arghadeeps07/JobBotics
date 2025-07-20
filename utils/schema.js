import { pgTable, serial, varchar, text, jsonb } from 'drizzle-orm/pg-core';


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