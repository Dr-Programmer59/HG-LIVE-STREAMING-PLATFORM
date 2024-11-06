import React from 'react'
import Sidebar from '@/components/Sidebar'
import AdminProtected from '@/components/AdminRpotected'

const layout = ({ children }) => {
  return (
    <AdminProtected>
      <div className='flex'>
        <Sidebar />
        <div className='p-5 flex-1 h-screen overflow-y-auto'>
          {children}
        </div>
      </div>
    </AdminProtected>
  )
}

export default layout