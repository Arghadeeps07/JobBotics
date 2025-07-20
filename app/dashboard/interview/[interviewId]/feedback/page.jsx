'use client'

import React, { use, useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, XCircle, Star, User, Lightbulb } from 'lucide-react'


const Feedback = ({ params }) => {
  const { interviewId } = use(params)
  const [result, setResult] = useState([])

  useEffect(() => {
    GetInterviewFeedback()
  }, [interviewId])

  const GetInterviewFeedback = async () => {
    const response = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockId, interviewId))
      .orderBy(UserAnswer.id)

    setResult(response)
  }

  // Optional: calculate average rating (assuming numeric string)
  const averageRating = result.length
    ? (
        result.reduce((acc, curr) => acc + parseFloat(curr.rating), 0) /
        result.length
      ).toFixed(1)
    : 'N/A'

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-3xl font-bold">🎉 Congratulations!</h1>
        <p className="text-muted-foreground">
          Here's a detailed report of your interview feedback.
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Star className="text-yellow-500" />
          <span className="text-xl font-semibold">Overall Rating: {averageRating} / 10</span>
        </div>
      </div>

      <div className="space-y-4">
        {result.map((item, index) => (
          <Card key={index} className="border shadow-sm">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Lightbulb className="text-blue-500 h-5 w-5" />
                Q{index + 1}: {item.question}
              </CardTitle>
              <Badge variant="outline" className="text-sm">
                Rating: {item.rating}/10
              </Badge>
            </CardHeader>

            <CardContent>
              <Separator className="mb-4" />
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <User className="text-muted-foreground h-4 w-4 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Your Answer:</p>
                    <p className="text-sm text-muted-foreground">{item.userAns}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle className="text-green-500 h-4 w-4 mt-1" />
                  <div>
                    <p className="text-sm font-medium">Correct Answer:</p>
                    <p className="text-sm text-muted-foreground">{item.correctAns}</p>
                  </div>
                </div>

                {item.feedback && (
                  <Collapsible>
                    <CollapsibleTrigger className="text-sm font-medium text-blue-600 hover:underline">
                      Show Feedback
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
                      {item.feedback}
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Feedback
