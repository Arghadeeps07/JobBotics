'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight, Video, Brain, Calendar } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f7f8fc] to-[#3b57b2] dark:from-gray-900 dark:to-gray-950 px-6 py-16">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
          Welcome to <span className="text-blue-600">JobBotics</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your AI-powered mock interview assistant. Practice, improve, and get ready to ace your next job interview with smart, personalized feedback.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="rounded-2xl shadow-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg" className="rounded-2xl">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border dark:border-gray-700 text-center">
            <Video className="w-10 h-10 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold">Mock Interviews</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Simulate technical, behavioral, or HR interviews with realistic AI-driven questions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border dark:border-gray-700 text-center">
            <Brain className="w-10 h-10 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold">Smart Feedback</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Get detailed insights on your answers and suggestions for improvement using AI analysis.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all border dark:border-gray-700 text-center">
            <Calendar className="w-10 h-10 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold">Track Progress</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              View past interviews, track your growth, and prepare better with every session.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to land your dream job?
          </h2>
          <Link href="/dashboard">
            <Button size="lg" className="rounded-2xl shadow-lg">
              Start Practicing Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
