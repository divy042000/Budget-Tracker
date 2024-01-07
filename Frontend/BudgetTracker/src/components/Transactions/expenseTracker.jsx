import React from 'react'
import  Autocomplete  from '../GlobalCompo/autoComplete';
function expenseTracker() {
    const categories = ['Groceries', 'Dining Out', 'Entertainment', 'Transportation', 'Utilities', 'Clothing', 'Healthcare', 'Home Maintenance'];

  return (
    <div>
        <h1>From :</h1>
        <Autocomplete options={categories}></Autocomplete>
    </div>
  )
}

export default expenseTracker