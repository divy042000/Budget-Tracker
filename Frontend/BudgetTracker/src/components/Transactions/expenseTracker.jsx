import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {currencyOptions}  from "../../assets/data"
import {accounts} from "../../assets/data";
import {categories} from "../../assets/data"
function expenseTracker() {
  const [date, setDate] = useState(new Date());
  const [sender,setSender] = useState("");
  const [tags,setTags] = useState("");
  const [currency,setCurrency] = useState("");




  return (
    <div>
      <div className="flex flex-col">
        <h1 className="content_text m-2">From :</h1>
        <div className="flex-row justify-between space-x-10">
         <select
        className="border-2 rounded h-[40px] w-[200px] shadow "
        defaultValue="Wallet"
       onChange={e => setSender(e.target.value)}
>
 {accounts.map((account, index) => (
   <option key={index} value={account.value}>
     {account.label}
   </option>
 ))}
</select>
          <select
            className="border-2 rounded h-[40px] w-[150px] shadow"
            defaultValue="USD"
            onChange={e => setCurrency(e.target.value)}
          >
            {currencyOptions.map((currencyOptions, index) => (
              <option key={index} value={currencyOptions.value}>
                {currencyOptions.label}
              </option>
            ))}
          </select>
        </div>
        <h1 className="content_text m-2">Tags :</h1>
        <div className="flex-row justify-between space-x-10">
          <select
            className="border-2 rounded h-[40px] w-[200px] shadow"
            defaultValue="Wallet"
            onChange={e => setTags(e.target.value)}
          >
            {categories.map((categories, index) => (
              <option key={index} value={categories.value}>
                {categories.label}
              </option>
            ))}
          </select>

          <DatePicker className="border-2 rounded h-[40px] w-[150px] shadow" selected={date} onChange={(date) => setDate(date)} />
        </div>
      </div>
     

      <div className="flex-row space-x-10">
        {/* <select
          className="border-2 rounded h-[40px] w-[200px] shadow mt-5"
          defaultValue="Wallet"
        > 
          {accounts.map((account, index) => (
            <option key={index} value={account.value}>
              {account.label}
            </option>
          ))}
        </select> */}
        <button className="btn w-[150px] m-2">Add Expense</button>
      </div>
    </div>
  );
}

export default expenseTracker;
