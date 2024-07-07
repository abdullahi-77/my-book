'use client'
import { SignInButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import CardInfo from './_components/CardInfo'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { additionalBudget, budgets, expenses } from '@/utils/schema'
import BarChartDashboard from './_components/BarChartDashboard'
import BudgetItem from './budgets/_components/BudgetItem'
import ExpenseListTable from './expenses/[id]/_components/ExpenseListTable'



const page = () => {


  const {user} = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
 

  useEffect(() => {
  
   
      getBudgetList();
      getAllExpenses();

    
  }, []);

  const getBudgetList = async () => {
    try {
      const result = await db.select({
        ...getTableColumns(budgets),
        totalSpend: sql `sum(${expenses.amount})`.mapWith(Number),
        totalItem: sql `count(${expenses.id})`.mapWith(Number),
        totalAdd: sql`COALESCE(sum(${additionalBudget.amount}), 0)`.mapWith(Number),
       
      }).from(budgets)
        .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
        .leftJoin(additionalBudget, eq(budgets.id, additionalBudget.budgetId))
        .groupBy(budgets.id)
        .orderBy(desc(budgets.id));
      setBudgetList(result);
      console.log(result);
   
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllExpenses = async () =>{
    try {
      const result = await db.select({
        id:expenses.id,
        name:expenses.name,
        amount:expenses.amount,
        createdAt: expenses.createdAt
      }).from(budgets)
      .rightJoin(expenses, eq(budgets.id, expenses.budgetId))
      .orderBy(desc(expenses.id));

      setExpenseList(result);


    } catch (error) {
      console.log(error.message)
    }
  }

 

  return (
    <div>
      <div className='p-5'>
        <h2 className='font-bold text-lg'>hi! {user?.fullName}</h2>
        <p className='text-gray-500'>Here is what is happening with your money and lets see your expenses</p>
        <CardInfo budgetList={budgetList}/>

        <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
          <div className='md:col-span-2 '>
            <BarChartDashboard  budgetList={budgetList}/>
            <div className='md:col-span-2 '>
            <ExpenseListTable expensesList={expenseList} refreshData={()=> getAllExpenses()}/>
          </div>
          </div>
         
          <div className='grid gap-2'>
          <h2 className='font-bold text-lg'>latest Budgets</h2>
             {budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={index}/>
             ))}
            </div>

            
        </div>
        </div>
    </div>
  )
}

export default page