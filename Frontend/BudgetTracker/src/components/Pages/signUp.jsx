import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function SignUp() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwtToken"]); // Use the useCookies hook to get and set the "jwtToken" cookie

  const [showTextField, setShowTextField] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);

  // State variables for validation status and error messages
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [showUserExistsDialog, setShowUserExistsDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleUserExistsDialogClose = () => {
    setShowUserExistsDialog(false);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleSignUpClick = () => {
    setShowTextField(true);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    // Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setEmailError(
        formData.email ? "Invalid email address" : "All fields are mandatory"
      );
      valid = false;
    }

    // Validate password complexity using a regular expression
    // At least one uppercase, one lowercase, one number, one special character, and at least 8 characters long.
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?/~`]).{8,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      setPasswordError(
        formData.password ? "Invalid password." : "All fields are mandatory"
      );
      valid = false;
      setOpen(!passwordRegex.test(formData.password));
    }

    setIsFormValid(valid);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted!");
      // Make a POST request to the backend with the form data
      fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the backend
          console.log(data);
          if (data.error && data.error === "User Already Exists") {
            // Show the "User Already Exists" pop-up dialog
            setShowUserExistsDialog(true);
          } else if (data.token) {
            // Save the JWT token in cookies and navigate to the user page
            // Redirect to the user profile page upon successful signin
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
          // Handle any errors
          console.error(error);
        });
    }
  };

  const handleGoogleSignUp = (e) => {
    e.preventDefault();
    console.log("handleGoogleSignUp function called");
    try {
      // Redirect the user to the Google OAuth2.0 authorization endpoint
      const googleAuthUrl = "http://localhost:5000/auth/google";
      window.open(googleAuthUrl, "_self");
    } catch (error) {
      // Handle error (if needed)
      console.error(error);
    }
  };
  // Function to handle the successful Google sign-in
  const handleSuccessfulGoogleSignIn = (data) => {
    // Extract the JWT token from the response data
    const jwtToken = data.token;

    // Store the JWT token in cookies
    setCookie("jwtToken", jwtToken, {
      path: "/", // Set the cookie to be accessible from all routes
      maxAge: 2 * 60 * 60, // Set the cookie expiration time (2 hours in this example)
      sameSite: "lax", // Set the sameSite attribute for improved security
      secure: false, // Set this to "true" if your frontend is served over HTTPS
    });

    // Redirect to the user page or perform other actions as needed
    navigate("/user");
  };

  const navigatelogin = () => {
    navigate('/login')
  }

  return (
    <div className="flex flex-col items-start bg-no-repeat bg-cover bg-center
		bg-[url('../public/images/loginimg.jpg')] justify-center min-h-screen w-full" >
      <div className="group">

      
      <div className="max-w-md animate-moveUpDown group-hover:animate-stopAnimation focus-within:transform-none w-full space-y-8  mb-32 mx-52 bg-[#f9f9f8] px-8 py-8 shadow-2xl rounded-2xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign Up
        </h2>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div className="">
            <div className="">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none my-4 shadow-sm rounded-md flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-nonemy-4 shadow-sm rounded-md flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
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
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
          <div className="items-center justify-center w-full text-center font-medium">
          Already have an account? <span className=" text-indigo-600 hover:text-indigo-500 cursor-pointer underline" onClick={navigatelogin}>Login here</span>
        </div>
        </form>
        
      </div>
      </div>
    </div>
  );
}
