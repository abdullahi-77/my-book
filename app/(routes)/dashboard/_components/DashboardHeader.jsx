import { UserButton } from '@clerk/nextjs'

import React from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import SideNave from './SideNave'
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'

const DashboardHeader = () => {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between'>
      
      <div>
     
      <Sheet>
  <SheetTrigger asChild>
    <Button className="shrink"
    variant="outline"
    size="icon">
<MenuIcon className='h-5 w-5'/>
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
  <SideNave />
  </SheetContent>
</Sheet>
      </div>
      <div>
        <UserButton />
        </div>
        
        
    </div>
  )
}

export default DashboardHeader