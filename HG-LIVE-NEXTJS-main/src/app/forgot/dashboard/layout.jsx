import React from 'react'
import Sidebar from '@/components/UserSidebar'

const layout = ({ children }) => {
  return (
      <div className='flex'>
        <Sidebar />
        <div className='p-5 flex-1 h-screen overflow-y-auto'>
          {children}
        </div>
      </div>
  )
}

export default layout