'use client'

import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="flex flex-col md:flex-row h-full w-full">

        {/* Left Image Section */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            className="h-full w-full object-cover"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
            alt="Login Visual"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60 flex flex-col justify-center items-center text-center px-10">
            <h1 className="text-white text-4xl font-bold mb-4">JobBotics</h1>
            <p className="text-gray-200 text-lg">
              Your smart AI Interviewer – practice, analyze, and ace your interviews with real-time feedback powered by AI.
            </p>
          </div>
        </div>

        {/* Right Signup Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10 bg-gray-50 dark:bg-zinc-900 transition-colors duration-300">
          <div className="w-full max-w-md">
            <SignUp appearance={{
              elements: {
                formButtonPrimary: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white",
              },
              variables: {
                colorPrimary: '#2563eb',
              }
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}
