'use client'
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = async () => {
    const result = await axios.post('/api/study-type', {
      courseId,
      studyType: 'notes'
    })
    console.log(result.data.notes);
    setNotes(result.data.notes || []);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 mt-12">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
          Study Notes
        </h1>

        {/* Progress Bar */}
        <div className="flex gap-3 items-center mb-10">
          {notes?.map((item, ind) => (
            <div
              key={ind}
              onClick={() => setStepCount(ind)}
              className={`flex-1 h-3 rounded-full cursor-pointer transition-all duration-500 ${
                ind <= stepCount
                  ? 'bg-blue-600 shadow-md'
                  : 'bg-gray-300 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>

        {/* Note Content */}
        <div className="prose dark:prose-invert max-w-none mb-10">
          {notes[stepCount] ? (
            <div dangerouslySetInnerHTML={{ __html: notes[stepCount].notes }} />
          ) : (
            <p className="text-gray-500 text-center">No notes available.</p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            disabled={stepCount === 0}
            onClick={() => setStepCount(stepCount - 1)}
            className="rounded-xl px-6"
          >
            Previous
          </Button>
          
          <Button
            onClick={() => router.back()}
            className="rounded-xl px-6 bg-blue-700"
          >
            Back to Course Page
          </Button>
          <Button
            variant="default"
            disabled={stepCount === notes.length - 1}
            onClick={() => setStepCount(stepCount + 1)}
            className="rounded-xl px-6"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
