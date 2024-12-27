import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiURl from "../controllers/Api";
import $ from "jquery";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState(""); // Correct variable name
  const [username, setUsername] = useState(""); // Correct variable name
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage(""); // Clear error message when switching forms
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear error message on submit

    // Validate form data
    if (
      !phone ||
      !password ||
      (!isLogin &&
        (!firstname || !lastname || !email || password !== confirm_password))
    ) {
      setErrorMessage(
        "Please fill all fields correctly or passwords do not match"
      );
      return;
    }

    let data = isLogin
      ? { phone, password }
      : {
          firstname,
          username,
          lastname,
          email,
          phone,
          password,
          confirm_password,
        };

    try {
      let response = await $.post(isLogin ? `${ApiURl}/login.php` : `${ApiURl}/signup.php`, data);
      if (response.success) {
        alert(response.message);
        localStorage.setItem("token", response.token || "");
        localStorage.setItem("cart_id", response.cart_id || "");
        localStorage.setItem("user_id", response.session?.user_id || "");

        // Navigate to the correct page
        if (response.redirect) {
          navigate(response.redirect);
        } else {
          navigate("/dashboard");  // Default to dashboard if no redirect is provided
        }
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage("Error: " + error.responseText);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-purple-400 to-purple-300">
      <div className="bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 px- p-8 rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Signup"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstname"
              >
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="firstname"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Enter your First name"
              />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-5">
            {!isLogin && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="firstname"
                >
                  First Name
                </label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  id="firstname"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Enter your First name"
                />
              </div>
            )}
            {!isLogin && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  id="lastname"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Enter your Last name"
                />
              </div>
            )}
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Id
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
          )}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mobileNo"
            >
              Mobile Number
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              id="mobileNo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter your Mobile Number"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                placeholder="Enter your confirm password"
              />
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 text-red-500">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            {isLogin ? "Don’t have an account?" : "Already have an account?"}
            <button
              className="text-blue-500 font-bold ml-1"
              onClick={toggleForm}
            >
              {isLogin ? "Signup" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

