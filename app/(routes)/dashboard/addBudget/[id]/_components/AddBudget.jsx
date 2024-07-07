import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { budgets, expenses, additionalBudget } from '@/utils/schema';
import moment from 'moment/moment';
import React, { useState } from 'react'
import { toast } from 'sonner';

const AddBudget = ({budgetId, user, refreshData, addBudgetList}) => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [product, setProduct] = useState('');
    
    const addNewbudget = async () =>{
        try {
        
              const result = await db.insert(additionalBudget).values({
                  name: name,
                  amount: amount,
                  product: product,
                  budgetId: budgetId,
                 // createdAt: user?.primaryEmailAddress?.emailAddress
                 createdAt: moment().format('DD/MM/YYYY')
              
              }).returning({ insertedId: budgets.id });
      
              // Display success message
              toast('Budget created successfully!');
            refreshData();
          
              // Reset form fields
              setName('');
              setAmount(0);
          } catch (error) {
              console.error(error);
              // Display error message
              toast('Failed to create budget. Please try again later.');
          }
    }

  return (
    <div className='mt-2 border p-5 rounded-lg'>
        <h2 className='font-bold text-xl'> Add new Budget</h2>

        <div >
                                <h2 className='text-black font-medium my-1'>Name</h2>
                                <Input onChange={(e) => setName(e.target.value)} value={name} placeholder='e.g. enter name' />
                            </div>
                            <div >
                                <h2 className='text-black font-medium my-1'>product</h2>
                                <Input onChange={(e) => setProduct(e.target.value)} value={product} placeholder='e.g. enter product' />
                            </div>
                            <div className='mt-2'>
                                <h2 className='text-black font-medium my-1'>Amount</h2>
                                <Input
                                    type="number"
                                    value={amount}
                    
                                    onChange={(e) => setAmount(e.target.value)} placeholder='e.g. $5000' />
                            </div>
                            <div>
                            <Button
                                disabled={!(name && amount)}
                                onClick={addNewbudget}
                                className="mt-5 w-full">Create Budget</Button>
                            </div>
    </div>
  )
}

export default AddBudget