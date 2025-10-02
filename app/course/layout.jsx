import NavbarCourse from '@/components/NavbarCourse'
import React, { Children } from 'react'

const layout = ({children}) => {
  
  return (
    <div>
        <NavbarCourse/>
        {children}
    </div>
  )
}

export default layout