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
  const [showPasswordInfo, setShowPasswordInfo] = React.useState(false);
  const [showUserExistsDialog, setShowUserExistsDialog] = React.useState(false);

  // State variables for validation status and error messages
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [isFormValid, setIsFormValid] = React.useState(false);

  const handleUserExistsDialogClose = () => {
    setShowUserExistsDialog(false);
  };

  const handleDialogClose = () => {
    setShowUserExistsDialog(false);
  };

  const handleSignUpClick = () => {
    setShowTextField(true);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?/~`]).{8,}$/;
    return passwordRegex.test(password);
  };

  const checkUserExists = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/auth/checkUserExists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted!");
      const userExists = await checkUserExists();
      if (userExists) {
        setShowUserExistsDialog(true);
      } else {
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
            if (data.token) {
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

  const navigatelogin = () => {
    navigate("/login");
  };

  const handlePasswordInfoClick = () => {
    setShowPasswordInfo(true);
  };

  return (
    <div className="flex flex-col items-start bg-no-repeat bg-cover bg-center bg-[url('../public/images/loginimg.jpg')] justify-center min-h-screen w-full">
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
                  className={`appearance-none my-4 shadow-sm rounded-md flex w-full px-3 py-2 border ${
                    emailError ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setEmailError("");
                  }}
                  onBlur={() => {
                    if (!validateEmail(formData.email)) {
                      setEmailError("Invalid email address");
                    }
                  }}
                  error={Boolean(emailError)}
                />
                {emailError && <p className="text-red-500">{emailError}</p>}
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  required
                  className={`appearance-nonemy-4 shadow-sm rounded-md flex w-full px-3 py-2 border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setPasswordError("");
                  }}
                  onBlur={() => {
                    if (!validatePassword(formData.password)) {
                      setPasswordError("Invalid password.");
                    }
                  }}
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                />
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>
                )}
                {showPasswordInfo && (
                  <p className="text-gray-500 text-sm mt-1">
                    Password should be at least 8 characters long and include at
                    least one uppercase, one lowercase, one number, and one
                    special character.
                  </p>
                )}
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
                onClick={handleSubmit}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={handleGoogleSignUp}
              >
                Sign Up with Google
              </button>
            </div>
            <div className="items-center justify-center w-full text-center font-medium">
              Already have an account?{" "}
              <span
                className=" text-indigo-600 hover:text-indigo-500 cursor-pointer underline"
                onClick={navigatelogin}
              >
                Login here
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
