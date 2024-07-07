'use client'
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import EmojiPicker from 'emoji-picker-react'

import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { budgets } from '@/utils/schema'
import { toast } from "sonner"
import { eq } from 'drizzle-orm'

const EditBudget = ({budgetInfo, refreshData}) => {

    const [emojiIcon, setEmojiIcon] = useState();
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const {user} = useUser();
   // console.log(budgetInfo);

   useEffect(()=>{
    
        if(budgetInfo){
            setAmount(budgetInfo.amount),
            setName(budgetInfo.name),
            setEmojiIcon(budgetInfo.icon)
        }
   },[budgetInfo])
   

   const onEditBudget = async () => {
    try {
        // Update the budget in the database
        const result = await db.update(budgets)
            .set({
                name: name,
                amount: amount,
                icon: emojiIcon,
                createdBy: user?.primaryEmailAddress?.emailAddress
            })
            .where(eq(budgets.id, budgetInfo.id))
            .returning();

        // Check if the update was successful
        if (result) {
            // Display a success message to the user
            toast('Budget updated successfully');
            // Call the refreshData function to update the UI
            refreshData();
        }
    } catch (error) {
        // Log any errors that occur during the update process
        console.log('Error updating budget:', error.message);
        // Display an error message to the user
        toast('Failed to update budget. Please try again later.');
    }
};

  return (
    <div>
        
        <Dialog>
                <DialogTrigger asChild>
                <Button className="flex gap-2 bg-orange-500"><PenBox />Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Budget</DialogTitle>
                        <DialogDescription>
                            <Button
                                variant="outline"
                                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                            >{emojiIcon}</Button>
                            <div className='absolute'>
                                <EmojiPicker
                                    open={openEmojiPicker}
                                    onEmojiClick={(e) => {
                                        setEmojiIcon(e.emoji)
                                        setOpenEmojiPicker(false)
                                    }}
                                />
                            </div>
                            <div className='mt-2'>
                                <h2 className='text-black font-medium my-1'>Name</h2>
                                <Input 
                                defaultValue={budgetInfo?.name}
                                onChange={(e) => setName(e.target.value)} placeholder='e.g. Home Decor' />
                            </div>
                            <div className='mt-2'>
                                <h2 className='text-black font-medium my-1'>Amount</h2>
                                <Input
                                    type="number"
                                    defaultValue={budgetInfo?.amount}
                                    onChange={(e) => setAmount(e.target.value)} placeholder='e.g. $5000' />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                disabled={!(name && amount)}
                                onClick={onEditBudget}
                                className="mt-5 w-full">Edit Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

    </div>
  )
}

export default EditBudget