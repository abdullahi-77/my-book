import React from 'react'
import SideNave from './dashboard/_components/SideNave'
import DashboardHeader from './dashboard/_components/DashboardHeader'
import DashboardFooter from './dashboard/_components/DashboardFooter'
import { ArrowLeft, MenuIcon } from 'lucide-react'


import { Button } from '@/components/ui/button'


const layout = ({children}) => {

  return (
    <div className='flex'>
    {/* Sidebar (visible on medium and larger devices) */}
   
    


   
    {/* Main content */}
    <div className='w-full'>
      {/* Header */}
     
      <DashboardHeader />

      {/* Content */}
      <div className="flex-1 h-screen">
        {children}
        <DashboardFooter className=" mt-10 fixed bottom-0 w-full" />
      </div>
      {/* Footer */}
      
    </div>
  </div>
  )
}

export default layout