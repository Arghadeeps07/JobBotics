import Navbar from '@/components/Navbar'
import React from 'react'

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className='mx-5 md:mx-20 lg:mx-36'>
        {children}
      </div>

    </div>
  )
}

export default layout