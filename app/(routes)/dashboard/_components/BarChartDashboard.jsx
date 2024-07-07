import React from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartDashboard = ({budgetList}) => {
  return (
    <div className='border rounded-lg p-5 md:w-3/4 lg:w-1/2 xl:w-1/3"'>
        <h2 className='font-bold text-lg'>Activity</h2>
        <ResponsiveContainer width={'80%'} height={300}>
        <BarChart 
       
         data={budgetList}
         margin={
            {
                top: 7,
            
            }
         }
         >
            
 
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="totalSpend" fill="#4845d2" />
  <Bar dataKey="amount" fill="#c3c2ff" />
</BarChart>
        </ResponsiveContainer>
       
    </div>
  )
}

export default BarChartDashboard