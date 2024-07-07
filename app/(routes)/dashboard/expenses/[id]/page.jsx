'use client'
import { db } from '@/utils/dbConfig';
import { budgets, expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from './_components/AddExpense';
import ExpenseListTable from './_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { PenBox, TrashIcon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from './_components/EditBudget';



const page = ({params}) => {
 

  const user = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);

  const route = useRouter();

  useEffect(() => {

      getBudgetInfo();
    
  }, []);

  const getBudgetInfo = async () => {
    try {
      const result = await db.select({
        ...getTableColumns(budgets),
        totalSpend: sql `sum(${expenses.amount})`.mapWith(Number),
        totalItem: sql `count(${expenses.id})`.mapWith(Number)
      }).from(budgets)
        .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
        .where(eq(budgets.id, params.id))
        .groupBy(budgets.id)
        .orderBy(desc(budgets.id));
  
        setBudgetInfo(result[0]);
        getExpenses();
  
      //  console.log(budgetInfo);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getExpenses = async () => {
    try {
      const result = await db.select().from(expenses)
      .where(eq(expenses.budgetId, params.id))
      .orderBy(desc(expenses.id));


      setExpensesList(result);
     

    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteBudget = async() => {
    try {

      const resultDeleteExpenses = await db.delete(expenses)
      .where(eq(expenses.budgetId, params.id))
      .returning();

      if(resultDeleteExpenses){
        const result = await db.delete(budgets)
        .where(eq(budgets.id, params.id))
        .returning()

        toast('Budget Deleted');
        route.replace('/dashboard/budgets');
      }

     
    } catch (error) {
      console.log(error.message);
    }
  }

  return (

    <div className='p-10'>
      <div className='flex justify-between'>
      <h2 className='text-2xl font-bold'>My expenses</h2>

      <div className='flex gap-2'>
      <EditBudget budgetInfo={budgetInfo} refreshData={() => getBudgetInfo()}/>
      <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-red-600 flex gap-2 p-2 rounded text-white">
          <TrashIcon className="w-5 h-5" />
          Delete Budget
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your current Budget
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <button className="bg-gray-300 p-2 rounded">Cancel</button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button onClick={deleteBudget} className="bg-red-600 p-2 rounded text-white">Continue</button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      </div>
       
      </div>
        <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
          {budgetInfo?<BudgetItem budget={budgetInfo}/>: <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse" >

        </div>
        }
        <AddExpense budgetId={params.id} user={user} refreshData={ ()=> getBudgetInfo()}/>

    </div>
    <div className='mt-5'>
<h2 className='font-bold text-3xl'>List of Expenses</h2>
<ExpenseListTable expensesList={expensesList} refreshData={ () => getBudgetInfo()}/>
</div>
    </div>
 
  )
}

export default page