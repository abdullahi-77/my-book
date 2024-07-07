import { db } from '@/utils/dbConfig'
import { expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Search } from 'lucide-react'

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { Button } from '@/components/ui/button'

const ExpenseListTable = ({ expensesList, refreshData }) => {

    const [rowData, setRowData] = useState([]);
    const [searchInput, setSearchInput] = useState();

    useEffect(() => {
        setRowData(expensesList);
 
    }, [expensesList]);

    const deleteExpense = async (id) => {
        try {
            await db.delete(expenses)
                .where(eq(expenses.id, id))
                .execute(); // 'returning' is not needed for delete operations
            toast('Expense deleted successfully');
            refreshData();
            budgetInfo();
        } catch (error) {
            console.error("Error deleting expense:", error.message);
        }
    }

    const handleDeleteClick = (id) => {
        if (window.confirm("Are you sure you want to delete this expense?")) {
            deleteExpense(id);
        }
    };

    const customButtonRenderer = (params) => {
        return (
            <Button variant='destructive' onClick={() => handleDeleteClick(params.data.id)}><Trash /></Button>
        );
    };

    // Column Definitions
    const colDefs = [
        { field: "id", filter: true },
        { field: "name", filter: true },
        { field: "amount", filter: true },
        { headerName: "Actions", cellRenderer: customButtonRenderer }
    ];

    return (
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
    );
}

export default ExpenseListTable;
