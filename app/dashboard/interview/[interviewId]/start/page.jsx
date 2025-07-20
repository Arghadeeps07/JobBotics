'use client'

import dynamic from 'next/dynamic'
import Question from '@/components/Question'
const RecordAnswerSection = dynamic(() => import('@/components/RecordAnswerSection'), {
  ssr: false
})

import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, Volume2Icon } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const StartInterview = ({ params }) => {
  const { interviewId } = use(params)
  const [interviewDetails, setInterviewDetails] = useState("")
  const [interviewQuestions, setInterviewQuestions] = useState([])
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

  useEffect(() => {
    const getInterviewDetails = async () => {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId))

      const jsonMockResponse = result[0].jsonMockResp
      setInterviewQuestions(jsonMockResponse)
      setInterviewDetails(result[0])
    }

    getInterviewDetails()
  }, [interviewId])

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    } else {
      alert("Sorry, your browser does not support text to speech.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-zinc-50 dark:bg-zinc-900">
      
      {/* Sidebar - Question Navigation */}
      <aside className="w-full md:w-1/4 border-r border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6 shadow-md">
        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">
          Questions
        </h2>
        <Question questions={interviewQuestions} activeIndex={activeQuestionIndex} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 md:p-8 space-y-6 border border-zinc-200 dark:border-zinc-700">

          {/* Question Display */}
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Question {activeQuestionIndex + 1}
            </h1>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
              {interviewQuestions[activeQuestionIndex]?.question}
              <Volume2Icon
                className="w-5 h-5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer transition-colors"
                onClick={() => textToSpeech(interviewQuestions[activeQuestionIndex]?.question)}
              />
            </p>
          </div>

          {/* Instructions */}
          <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl px-4 py-3 text-blue-800 dark:text-blue-300 shadow-sm">
            <Lightbulb className="w-5 h-5" />
            <span className="text-sm font-medium">Click the record button to record your answer.</span>
          </div>

          {/* Answer Recording Section */}
          <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
            <RecordAnswerSection
              questions={interviewQuestions}
              activeIndex={activeQuestionIndex}
              interviewDetails={interviewDetails}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <div className="flex gap-3">
              {activeQuestionIndex > 0 && (
                <Button variant="outline" onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
                  Previous Question
                </Button>
              )}
              {activeQuestionIndex < interviewQuestions.length - 1 && (
                <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
                  Next Question
                </Button>
              )}
            </div>

            <Link href={`/dashboard/interview/${interviewDetails.mockId}/feedback`}>
              <Button variant="destructive">End Interview</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default StartInterview
