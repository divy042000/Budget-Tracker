

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; 

const Login = ()=> {
 const navigate = useNavigate();
 const [cookies, setCookie] = useCookies(["jwtToken"]); // Use the useCookies hook to get and set the "jwtToken" cookie
 const [showTextField, setShowTextField] = React.useState(false);

 const [formData, setFormData] = React.useState({
   email: "",
   password: "",
 });
 const handleSignUpClick = () => {
   setShowTextField(true);
 };

 const [showPassword, setShowPassword] = React.useState(false);
 const [emailError, setEmailError] = React.useState("");
 const [passwordError, setPasswordError] = React.useState("");
 const [isFormValid, setIsFormValid] = React.useState(false);

 const handleClickShowPassword = () => setShowPassword((show) => !show);
 const handleMouseDownPassword = (event) => {
   event.preventDefault();
 };

 const validateForm = () => {
   let valid = true;
   setEmailError("");
   setPasswordError("");

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!formData.email || !emailRegex.test(formData.email)) {
     setEmailError(
       formData.email ? "Invalid email address" : "All fields are mandatory"
     );
     valid = false;
   }

   if (!formData.password) {
     setPasswordError(
       formData.password ? "Invalid password." : "All fields are mandatory"
     );
     valid = false;
   }

   setIsFormValid(valid);
   return valid;
 };

 const handleSubmit = (e) => {
   e.preventDefault();
   if (validateForm()) {
     console.log("Form submitted!");
     fetch("http://localhost:5000/auth/signin", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(formData),
     })
       .then((response) => response.json())
       .then((data) => {
         console.log(data);

         if (data.error) {
           if (data.error === "User not found") {
             setEmailError("User not found");
           } else if (data.error === "Invalid password") {
             setPasswordError("Invalid password");
           }
         } else {
           setCookie("jwtToken", data.token, {
             path: "/",
             maxAge: 2 * 60 * 60,
             sameSite: "lax",
             secure: false,
           });
           
           navigate("/user");
         }
       })
       .catch((error) => {
         console.error(error);
       });
   }
 };

 const handleGoogleSignUp = (e) => {
   e.preventDefault();
   console.log("handleGoogleSignUp function called");
   try {
     const googleAuthUrl = "http://localhost:5000/auth/google";
     window.open(googleAuthUrl, "_self");
   } catch (error) {
     console.error(error);
   }
 };

 return (
  <div className="px-20 bg-no-repeat bg-cover bg-center
  bg-[url('../public/images/loginimg.jpg')] justify-center min-h-screen w-full">
   <div className="h-screen flex items-center justify-left   px-4 sm:px-6 lg:px-8 ">
     <div className="max-w-md w-full space-y-8 px-8">
       <div>
         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
           Sign In
         </h2>
       </div>
       <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
         <input type="hidden" name="remember" value="true" />
         <div className="rounded-md shadow-sm space-y-3">
           <div>
             <label htmlFor="email-address" className="sr-only">
               Email address
             </label>
             <input
               id="email"
               name="email"
               type="email"
               autoComplete="email"
               required
               className={`appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm ${
                 emailError && "border-red-500"
               }`}
               placeholder="Email address"
               value={formData.email}
               onChange={(e) =>
                 setFormData({ ...formData, email: e.target.value })
               }
             />
             {emailError && (
               <p className="mt-2 text-sm text-red-600">{emailError}</p>
             )}
           </div>
           <div>
             <label htmlFor="password" className="sr-only">
               Password
             </label>
             <input
               id="password"
               name="password"
               type="password"
               autoComplete="current-password"
               required
               className={`appearance-none rounded   relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm ${
                 passwordError && "border-red-500"
               }`}
               placeholder="Password"
               value={formData.password}
               onChange={(e) =>
                 setFormData({ ...formData, password: e.target.value })
               }
             />
             {passwordError && (
               <p className="mt-2 text-sm text-red-600">{passwordError}</p>
             )}
           </div>
         </div>

         <div className="flex items-center justify-between">
           <div className="flex items-center">
             <input
               id="remember_me"
               name="remember_me"
               type="checkbox"
               className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
             />
             <label
               htmlFor="remember_me"
               className="ml-2 block text-sm text-gray-900"
             >
               Remember me
             </label>
           </div>

           <div className="text-sm">
             <a
               href="#"
               className="font-medium text-purple-600 hover:text-purple-500"
             >
               Forgot your password?
             </a>
           </div>
         </div>

         <div>
           <button
             type="submit"
             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
           >
             Sign in
           </button>
         </div>
       </form>
     </div>
   </div>
   </div>
 )
}

export default Login;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import { useState } from "react";

// export default function Signup() {
//  const navigate = useNavigate();
//  const [cookies, setCookie] = useCookies(["jwtToken"]);
//  const [formData, setFormData] = useState({
//    email: "",
//    password: "",
//  });
//  const [showPassword, setShowPassword] = useState(false);
//  const [emailError, setEmailError] = useState("");
//  const [passwordError, setPasswordError] = useState("");
//  const [isFormValid, setIsFormValid] = useState(false);
//  const [showUserExistsDialog, setShowUserExistsDialog] = useState(false);
//  const [open, setOpen] = useState(false);

//  // ... Rest of your code ...

//  return (
//    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
//          <div className="max-w-md mx-auto">
//            <div>
//              <img src="/logo.svg" className="h-7 sm:h-8" />
//            </div>
//            <div className="divide-y divide-gray-200">
//              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                <p>Sign up with Email</p>
//                <input
//                 type="email"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 placeholder="Email address"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                />
//                <input
//                 type={showPassword ? "text" : "password"}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//                />
//                <button
//                 type="submit"
//                 onClick={handleSubmit}
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                >
//                 Continue
//                </button>
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//    </div>
//  );
// }
