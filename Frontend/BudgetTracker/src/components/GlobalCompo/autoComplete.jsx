import React, { useState } from 'react';

const AutocompleteInput = ({ options }) => {
 const [inputValue, setInputValue] = useState("");
 const [filteredOptions, setFilteredOptions] = useState([]);

 // Update filtered options whenever input value changes
 const updateFilteredOptions = (value) => {
   const lowerCaseValue = value.toLowerCase();
   setFilteredOptions(options.filter(option => option.toLowerCase().includes(lowerCaseValue)));
 };

 // Handle input change
 const handleInputChange = (event) => {
   setInputValue(event.target.value);
   updateFilteredOptions(event.target.value);
 };

 // Handle option click
 const handleOptionClick = (option) => {
   setInputValue(option);
   setFilteredOptions([]);
 };

 return (
  <div className="flex"> 
<div className="relative inline-block w-full text-gray-700">
 <input
   type="text"
   value={inputValue}
   onChange={handleInputChange}
   className="w-full h-10 pl-3 pr-10 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
 />
 {filteredOptions.length > 0 && (
   <div className="absolute left-0 mt-2 w-full rounded-md shadow-lg">
     <ul className="py-1 overflow-auto max-h-60">
       {filteredOptions.map((option, index) => (
         <li
           key={index}
           onClick={() => handleOptionClick(option)}
           className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
         >
           {option}
         </li>
       ))}
     </ul>
   </div>
 )}
</div>


  </div>

 );
};

export default AutocompleteInput;
