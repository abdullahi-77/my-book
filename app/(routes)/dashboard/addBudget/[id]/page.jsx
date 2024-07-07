'use client'
import React, { useEffect, useState } from 'react'

import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns } from 'drizzle-orm';
import { budgets, expenses, additionalBudget } from '@/utils/schema';
import AddBudgetList from './_components/AddBudgetList';
import AddBudget from './_components/AddBudget';
import { useUser } from '@clerk/nextjs';

const page = ({params}) => {
  const [addBudgetList, setaddBudgetList] = useState([]);
  const user = useUser();
  
  useEffect(() => {

    getAllAddBudget();
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

      //  console.log(budgetInfo);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllAddBudget = async () => {
    try {
      const result = await db.select({
        id: additionalBudget.id,
        name: additionalBudget.name,
        amount: additionalBudget.amount,
        createdAt: additionalBudget.createdAt
      }).from(budgets)
        .rightJoin(additionalBudget, eq(budgets.id, additionalBudget.budgetId))
        .orderBy(desc(additionalBudget.id));

        setaddBudgetList(result);
      getBudgetInfo();

    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className='mt-5 p-7'>
           <AddBudget budgetId={params.id} user={user} refreshData={ ()=> getAllAddBudget()}/>
      <AddBudgetList addBudgetList={(addBudgetList)} refreshData={() => getAllAddBudget()} budgetInfo={() => getBudgetInfo()} />
    </div>
  )
}

export default page
