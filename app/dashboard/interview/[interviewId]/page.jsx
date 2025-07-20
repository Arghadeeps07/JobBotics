'use client'

import React, { use, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { WebcamIcon, LoaderCircle } from 'lucide-react'
import Webcam from 'react-webcam'
import Link from 'next/link'

const Interview = ({ params }) => {
  const { interviewId } = use(params)
  const [interviewDetails, setInterviewDetails] = useState(null)
  const [webcamEnable, setWebcamEnable] = useState(false)

  useEffect(() => {
    const getInterviewDetails = async () => {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId))

      setInterviewDetails(result[0]) // assuming only one match
    }

    getInterviewDetails()
  }, [interviewId])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Let's Get Started</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-start justify-center">
        {/* Left Section: Webcam */}
        <div className="flex flex-col items-center w-full md:w-1/2">
          {webcamEnable ? (
            <>
              <Webcam
                onUserMedia={() => setWebcamEnable(true)}
                onUserMediaError={() => setWebcamEnable(false)}
                mirrored={true}
                className="rounded-lg shadow-md w-full max-w-md aspect-video object-cover"
              />
              <Button
                onClick={() => setWebcamEnable(false)}
                className="mt-4 w-full max-w-md"
              >
                Turn Off Camera
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg w-full max-w-md aspect-video text-gray-500">
                <WebcamIcon className="w-12 h-12 mb-2" />
                <p className="mb-2">Camera is off</p>
              </div>
              <Button
                onClick={() => setWebcamEnable(true)}
                className="mt-4 w-full max-w-md"
              >
                Turn On Camera
              </Button>
            </>
          )}
        </div>

        {/* Right Section: Interview Details */}
        <div className="w-full md:w-1/2 space-y-4">
          {interviewDetails ? (
            <>
              <div>
                <h2 className="text-lg font-semibold">Job Role / Position:</h2>
                <p className="text-gray-700">{interviewDetails.jobPosition}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Job Description / Tech Stack:</h2>
                <p className="text-gray-700 whitespace-pre-line">{interviewDetails.jobDesc}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Years of Experience:</h2>
                <p className="text-gray-700">{interviewDetails.jobExperience}</p>
              </div>
              <Link href={`/dashboard/interview/${interviewId}/start`}>
              <Button>Start Interview</Button>
              </Link>
            </>
          ) : (
            <p className="text-gray-500 flex items-center gap-2">
              <LoaderCircle className="animate-spin" />
              Loading interview details...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Interview
