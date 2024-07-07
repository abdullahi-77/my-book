import React from 'react'

const DashboardFooter = () => {
    const date = new Date();
  return (
    <div className='p-5 shadow-sm border-t flex items-center justify-center'>
     Developed by leyth Technology @ {date.getFullYear()}
    </div>
  )
}

export default DashboardFooter
