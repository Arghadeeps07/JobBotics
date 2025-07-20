'use client'

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { desc, eq } from 'drizzle-orm'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Briefcase, Calendar, Mail } from 'lucide-react'
import Link from 'next/link'

const InterviewList = () => {
    const { user, isLoaded } = useUser()
    const [interviewList, setInterviewList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
            getInterviewList()
        }
    }, [isLoaded, user])

    const getInterviewList = async () => {
        try {
            const result = await db.select()
                .from(MockInterview)
                .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(MockInterview.id))

            setInterviewList(result)
        } catch (error) {
            console.error('Error loading interviews:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mt-10 space-y-6">
            <h1 className="text-2xl font-semibold">📝 Previous Mock Interviews</h1>

            {loading ? (
                <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span>Loading interviews...</span>
                </div>
            ) : interviewList.length === 0 ? (
                <p className="text-muted-foreground">You haven’t created any interviews yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {interviewList.map((interview, index) => (
                        <Link  key={interview.id} href={`/dashboard/interview/${interview.mockId}/feedback` }>
                            <Card key={interview.id} className="transition-shadow hover:shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-blue-600" />
                                        {interview.jobPosition}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="text-sm text-muted-foreground line-clamp-3">
                                        {interview.jobDesc}
                                    </div>



                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {interview.createdAt}
                                        </span>
                                        <Badge variant="outline">{interview.jobExperience} exp</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default InterviewList
