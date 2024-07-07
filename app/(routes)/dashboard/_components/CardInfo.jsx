import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CardInfo = ({budgetList}) => {

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSepnd, setTotalSpend] = useState(0);

    useEffect(()=>{
        budgetList&&calculateCardInfo();
       
    },[budgetList])

    const calculateCardInfo = () => {
      let totalBudget_ = 0;
      let totalSpend_ = 0;

        budgetList.forEach(element => {

            totalBudget_ = totalBudget_ + Number(element.amount);
            totalSpend_ = totalSpend_ + element.totalSpend;

            setTotalBudget(totalBudget_);
            setTotalSpend(totalSpend_);

        });
       
    }

    

  return (
    <div>
        {budgetList?.length > 0 ?
    <div className='mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
        <div className=' p-7 border rounded-lg flex items-center justify-between'>
            <div className=''>
                <h2 className='text-sm'>Total Budget</h2>
                <h2 className='font-bold text-lg'>${totalBudget}</h2>
                </div>
                <PiggyBank className='bg-blue-500 p-3 h-12 w-12  rounded-full text-white'/>
        </div>

        <div className=' p-7 border rounded-lg flex items-center justify-between'>
            <div className=''>
                <h2 className='text-sm'>Total Spend</h2>
                <h2 className='font-bold text-lg'>${totalSepnd}</h2>
                </div>
                <ReceiptText className='bg-blue-500 p-3 h-12 w-12  rounded-full text-white'/>
        </div>

        <div className=' p-7 border rounded-lg flex items-center justify-between'>
            <div className=''>
                <h2 className='text-sm'>No of Budget</h2>
                <h2 className='font-bold text-lg'>{budgetList?.length}</h2>
                </div>
                <Wallet className='bg-blue-500 p-3 h-12 w-12  rounded-full text-white'/>
        </div>
    </div>
    :
    <div className='mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
       { [1,2,3].map((item, index) =>(
            <div className='h-[110px] w-full bg-slate-300 animate-pulse rounded-lg'>

        </div>
        ))
    }
    </div>
    }
    </div>
  )
}

export default CardInfo