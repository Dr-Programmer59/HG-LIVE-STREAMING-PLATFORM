import React from 'react'
import Sidebar from '@/components/UserSidebar'
import DashboardProtectedRoute from '@/components/DashboardProtectedRoute'

const layout = ({ children }) => {
  return (
    <DashboardProtectedRoute>
      <div className='flex'>
        <Sidebar />
        <div className='p-5 flex-1 h-screen overflow-y-auto'>
          {children}
        </div>
      </div>
    </DashboardProtectedRoute>
  )
}

export default layout