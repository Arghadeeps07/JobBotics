'use client'
import React from 'react'

const Question = ({ questions, activeIndex }) => {
    return (
        <div className="space-y-3">
            {questions &&
                questions.map((question, index) => (
                    <div
                        key={index}
                        className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium
                            ${activeIndex === index
                                ? 'bg-blue-100 text-blue-600'
                                : 'hover:bg-gray-100 text-gray-800'}
                        `}
                    >
                        Question {index + 1}
                    </div>
                ))}
        </div>
    )
}

export default Question
