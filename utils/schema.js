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