import React, { useState } from 'react';
import ExpenseComponent from './expenseTracker';
import IncomeComponent from './incomeTracker';
import TransferComponent from './transferTracker';

const Transaction = () => {
 const [hoveredField, setHoveredField] = useState('expense');
 const [selectedField, setSelectedField] = useState('expense');
 console.log(hoveredField," ",selectedField);
 return (
  <div>
<div className="flex flex-row space-x-4 p-4 bg-gray-200 rounded-md border-3 rounded">
  <div className="flex"> 
  <div className="flex flex-col">
  <button 
   onMouseEnter={() => setHoveredField('income')}
   onClick={() => setSelectedField('income')} 
  //  onMouseLeave={() => setHoveredField(null)}
   className="px-6 py-2 text-white bg-blue-500 rounded-l-lg mr-0.5"
 >
   Income
 </button>
 {((hoveredField === 'income') && (selectedField === 'income')) && <IncomeComponent />}
  </div>
<div>
<button 
   onMouseEnter={() => setHoveredField('expense')} 
   onClick={() => setSelectedField('expense')} 
  //  onMouseLeave={() => setHoveredField(null)}
   
   className="px-6 py-2 text-white bg-red-500"
 >
   Expense
 </button>
 {((hoveredField === 'expense') && (selectedField === 'expense')) && <ExpenseComponent />}
</div>
<div>
<button 
   onMouseEnter={() => setHoveredField('transfer')} 
   onClick={() => setSelectedField('transfer')}
  //  onMouseLeave={() => setHoveredField(null)}
   className="px-6 py-2 text-white bg-green-500 rounded-r-lg ml-0.5"
 >
   Transfer
 </button>
 {((hoveredField === 'transfer') && (selectedField === 'transfer' )) && <TransferComponent/>}
</div>
</div>
</div>
<div>

  
</div>
</div>
 );
};

export default Transaction;
