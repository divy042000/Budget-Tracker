import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";

export default function Signup() {
 const navigate = useNavigate();
 const [cookies, setCookie] = useCookies(["jwtToken"]);
 const [formData, setFormData] = useState({
   email: "",
   password: "",
 });
 const [showPassword, setShowPassword] = useState(false);
 const [emailError, setEmailError] = useState("");
 const [passwordError, setPasswordError] = useState("");
 const [isFormValid, setIsFormValid] = useState(false);
 const [showUserExistsDialog, setShowUserExistsDialog] = useState(false);
 const [open, setOpen] = useState(false);

 // ... Rest of your code ...

 return (
   <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
     <div className="relative py-3 sm:max-w-xl sm:mx-auto">
       <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
       <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
         <div className="max-w-md mx-auto">
           <div>
             <img src="/logo.svg" className="h-7 sm:h-8" />
           </div>
           <div className="divide-y divide-gray-200">
             <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
               <p>Sign up with Email</p>
               <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
               />
               <input
                type={showPassword ? "text" : "password"}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
               />
               <button
                type="submit"
                onClick={handleSubmit}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               >
                Continue
               </button>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}
