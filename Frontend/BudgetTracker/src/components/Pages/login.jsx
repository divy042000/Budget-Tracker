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
  <div className="px-20">
   <div className="h-screen flex items-center justify-left  px-4 sm:px-6 lg:px-8 ">
     <div className="max-w-md w-full space-y-8 px-8">
       <div>
         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
           Sign In
         </h2>
       </div>
       <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
         <input type="hidden" name="remember" value="true" />
         <div className="rounded-md shadow-sm -space-y-px">
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
               className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm ${
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
               className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm ${
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
