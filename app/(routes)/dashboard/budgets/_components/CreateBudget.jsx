'use client'
import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { budgets } from '@/utils/schema'
import { toast } from "sonner"
import { eq } from 'drizzle-orm'


const CreateBudget = ({ refreshData }) => {

    const [emojiIcon, setEmojiIcon] = useState();
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const { user } = useUser();

    const onCreateBudget = async () => {
        try {
        
            // Check if the budget name already exists
            const existingBudget = await db.select().from(budgets).where(eq(budgets.name,name));
            console.log(existingBudget);
          //  console.log(existingBudget);

            if (existingBudget > 0) {
                // Display error message
                
                return toast('Budget with the same name already exists.');
            }


            const result = await db.insert(budgets).values({
                name: name,
                amount: amount,
                icon: emojiIcon,
                createdBy: user?.primaryEmailAddress?.emailAddress
            }).returning({ insertedId: budgets.id });

            // Display success message
            toast('Budget created successfully!');
            refreshData();
            // Reset form fields
            setName('');
            setAmount(0);
            setEmojiIcon('');
            setOpenEmojiPicker(true);
        } catch (error) {
            console.log(error.message);
            // Display error message
            toast('Failed to create budget. Please try again later.');
        }
    }


    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <div className='bg-slate-100 p-10 rounded-md items-center
                    flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
                        <h2 className='text-3xl'>+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
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
                                <Input onChange={(e) => setName(e.target.value)} placeholder='e.g. Home Decor' />
                            </div>
                            <div className='mt-2'>
                                <h2 className='text-black font-medium my-1'>Amount</h2>
                                <Input
                                    type="number"
                                    onChange={(e) => setAmount(e.target.value)} placeholder='e.g. $5000' />
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                disabled={!(name && amount)}
                                onClick={onCreateBudget}
                                className="mt-5 w-full">Create Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateBudget
