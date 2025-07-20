'use client'

import AddNewInterview from '@/components/AddNewInterview'
import InterviewList from '@/components/InterviewList'
import React from 'react'
import { Separator } from '@/components/ui/separator'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] via-[#e3e8ff] to-[#b1c1ff] py-10">
      <div className="max-w-7xl mx-auto px-6 py-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg space-y-10">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-blue-900">Dashboard</h1>
          <p className="text-gray-600 text-base">
            Welcome to your dashboard! Here you can manage your interviews and settings.
          </p>
        </div>

        <Separator />

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-800">Create New Mock Interview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AddNewInterview />
          </div>
        </div>

        <Separator />

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-blue-800">Previous Interviews</h2>
          <InterviewList />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
