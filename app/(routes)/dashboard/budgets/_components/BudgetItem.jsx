
import { budgets } from '@/utils/schema'
import Link from 'next/link'
import React from 'react'

const BudgetItem = ({ budget }) => {

    const calculateProgressPercentage = () => {
        if (budget.totalSpend === 0 || budget.amount === 0) {
            return 0; // Return 0 if totalSpend or amount is 0 to avoid division by zero
        }
    
        let percentage = (budget.totalSpend / budget.amount) * 100;
    
        // Limit the percentage to 100 if totalSpend exceeds the budget amount
        if (percentage > 100) {
            percentage = 100;
        }
    
        return percentage.toFixed(2);
    };

    let number = parseInt(budget.amount);
    const total = (budget && budget.amount) ? number + budget.totalAdd : budget.totalAdd;
  //  console.log(total);

    return (
        <Link href={'/dashboard/expenses/' + budget?.id}>

            <div className='p-5 border rounded-lg 
                            cursor-pointer hover:shadow-md'>
                <div className='flex gap-2 items-center justify-between'>
                    <div className='flex gap-2 items-center'>
                        <h2 className='text-3xl p-2 bg-slate-100 rounded-full'>
                            {budget?.icon}</h2>
                        <div>
                            <h2 className='font-bold'>{budget?.name}</h2>
                            <h2 className='text-sm text-gray-500'>{budget?.totalItem ? budget?.totalItem : 0} item</h2>
                        </div>
                    </div>
                    <h2 className='font-bold text-primary text-lg'>${total}</h2>

                </div>

                <div className='mt-5'>
                    <div className='flex items-center justify-between mb-3 text-xs text-slate-400'>
                        <h2>${budget?.totalSpend ? budget?.totalSpend : 0} spend</h2>
                        <h2>${total - budget?.totalSpend} remaining</h2>
                    </div>
                    <div className='w-full bg-slate-300 h-2 rounded-full'>
                        <div className='bg-blue-500 h-2 rounded-full'
                            style={{
                                width: `${calculateProgressPercentage()}%`
                            }}
                        ></div>
                    </div>
                </div>

            </div>
        </Link>

    )
}

export default BudgetItem