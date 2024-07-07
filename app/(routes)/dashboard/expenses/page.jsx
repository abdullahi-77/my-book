'use client'
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './[id]/_components/ExpenseListTable'
import { db } from '@/utils/dbConfig';
import { desc, eq } from 'drizzle-orm';
import { budgets, expenses } from '@/utils/schema';

const page = () => {
  const [expenseList, setExpenseList] = useState([]);
 
  useEffect(() => {

    getAllExpenses();
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

  const getAllExpenses = async () => {
    try {
      const result = await db.select({
        id: expenses.id,
        name: expenses.name,
        amount: expenses.amount,
        createdAt: expenses.createdAt
      }).from(budgets)
        .rightJoin(expenses, eq(budgets.id, expenses.budgetId))
        .orderBy(desc(expenses.id));

      setExpenseList(result);
      getBudgetInfo();

    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className='mt-5 p-7'>
      <h2>Latest List of Expenses</h2>
      <ExpenseListTable expensesList={expenseList} refreshData={() => getAllExpenses()} budgetInfo={() => getBudgetInfo()} />
    </div>
  )
}

export default page