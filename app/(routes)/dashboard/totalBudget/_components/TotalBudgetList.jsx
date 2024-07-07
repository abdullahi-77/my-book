'use client'
import React, { useEffect, useState } from 'react'

import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { additionalBudget, budgets, expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { Button } from '@/components/ui/button'
import { Plus, Search, Trash } from 'lucide-react'
import Link from 'next/link'


const BudgetList = () => {
  const user = useUser();
  const [budgetList, setBudgetList] = useState([]);

  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
      setRowData(budgetList);

  }, [budgetList]);

  useEffect(() => {

    getBudgetList();

  }, []);

  const customButtonRenderer = (params) => {
    return (
      <div>
           <Link href={'/dashboard/addBudget/' + params.data.id}><Button className="bg-green-600">kudar</Button>  </Link>
   
           <Link href={'/dashboard/expenses/' + params.data.id}><Button className="bg-red-500">kajar</Button>  </Link>
      </div>
    );
};


const getBudgetList = async () => {
    try {
      const result = await db.select({
        ...getTableColumns(budgets),
        totalSpend: sql `sum(${expenses.amount})`.mapWith(Number),
        totalItem: sql `count(${expenses.id})`.mapWith(Number),
        totalAdd: sql`COALESCE(sum(${additionalBudget.amount}), 0)`.mapWith(Number),
        totalAmount: sql` sum(${additionalBudget.amount})`.mapWith(Number),
       
      }).from(budgets)
        .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
        .leftJoin(additionalBudget, eq(budgets.id, additionalBudget.budgetId))
        .groupBy(budgets.id)
        .orderBy(desc(budgets.id));
        setBudgetList(result);
        setRowData(result)
   
    } catch (error) {
      console.log(error.message);
    }
  };

   // Column Definitions
   const colDefs = [
    { field: "id", filter: true },
    { field: "name", filter: true },
    { field: "amount", filter: true },
    {field: "totalAmount", filter: true},
    { headerName: "Actions", cellRenderer: customButtonRenderer }
];



  return (
    <div className='mt-7'>
  { /*   <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget refreshData={() => getBudgetList()} />
        {budgetList?.length > 0 ? budgetList.map((budget, index) => (
          <BudgetItem key={index} budget={budget} />
        ))
          : [1, 2, 3, 4, 5].map((item, index) => (
            <div key={index} className='w-full bg-slate-200 rounded-lg h-[80px] animate-pulse'>

            </div>
          ))

        }
      </div> */}

      <div className="ag-theme-quartz pt-3" style={{ height: 550 }}>
            <div className='p-2 border shadow-sm flex gap-2 rounded-lg mb-4 max-w-sm items-center'>
                <Search />
                <input
                    type="text"
                    placeholder="Search on Anything"
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="outline-none w-full"
                />
            </div>

            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                quickFilterText={searchInput}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[25, 50, 100]}
            />
        </div>


    </div>

  );
}

export default BudgetList;
