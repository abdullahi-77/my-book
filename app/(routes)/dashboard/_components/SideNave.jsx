'use client'
import { ArrowLeft, LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const SideNave = () => {
  const path = usePathname();
  const [open, setOpen] = useState(true);
  const menuList = [
    {
      id: 1,
      name: 'dashboard',
      icon: LayoutGrid,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Budget',
      icon: PiggyBank,
      path: '/dashboard/budgets'
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptText,
      path: '/dashboard/expenses'
    },
    {
      id: 4,
      name: 'AddBuget',
      icon: ShieldCheck,
      path: '/dashboard/addBudget'
    },
    {
      id: 5,
      name: 'totalBudget',
      icon: ShieldCheck,
      path: '/dashboard/totalBudget'
    },
  ]
  return (
    <div className=''>
      <div className={`${open ? 'w-64' : 'w-20'} duration-300  relative h-screen p-5 border-r shadow-sm`}>
        <ArrowLeft onClick={() => setOpen(!open)} className={`${!open && 'rotate-180'} absolute cursor-pointer
         -right-3 top-9 border bg-blue-500 rounded-full`} />
         <div className='flex items-center gap-1'>
         <Image className='cursor-pointer duration-300' src={'/logoIcon.svg'} alt='logo' width={60} height={60} />
         <h2 className={`origin-left  ${!open && 'scale-0'}  font-bold text-2xl duration-300`}>LogoIpusm</h2>
         </div>
        
        <div>
          {menuList.map((menu, index) => (
            <Link href={menu.path} key={menu.id} >
              <div className={`flex gap-2 items-center text-gray-500
          font-medium py-5 mt-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-500
          ${path == menu.path && 'text-primary bg-blue-500'}`}>
                <menu.icon className='w-10' />
                <h2 className={`${!open && 'hidden'} origin-left duration-300`}>{menu.name}</h2> </div></Link>
          ))}
        </div>
       
      </div>
    </div>
  )
}

export default SideNave