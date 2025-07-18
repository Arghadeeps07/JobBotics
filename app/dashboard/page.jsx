import AddNewInterview from '@/components/AddNewInterview'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>
        Welcome to your dashboard! Here you can manage your interviews and settings.
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        <AddNewInterview />
      </div>
    </div>
  )
}

export default Dashboard