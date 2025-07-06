import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import useUserStore from "../stores/useUserStore.js";

export default function AuthForm() {
  //   const [isSignUp, setIsSignUp] = useState(isSignUpProp);
  const location = useLocation();
  const isSignUp = location.pathname === "/signup";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    signup(formData);
    console.log("Sign up Attempted");
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        {/* Toggle Buttons */}
        <div className="flex justify-between mb-6 border-b">
          <Link
            to="/signup"
            className={`w-1/2 py-2 text-center font-medium ${
              isSignUp ? "text-white bg-blue-500" : "bg-gray-100"
            }`}
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className={`w-1/2 py-2 text-center font-medium ${
              !isSignUp ? "text-white bg-blue-500" : "bg-gray-100"
            }`}
          >
            Login
          </Link>
        </div>

        {/* Form */}
        {
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-center">
              Create Account
            </h2>
            <p className="text-sm text-center text-gray-500">
              Create your account to start your journey.
            </p>

            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john.doe@example.com"
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Create a password"
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="Confirm your password"
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Sign Up
            </button>

            <div className="flex items-center justify-center space-x-2 mt-4">
              <div className="h-px w-full bg-gray-300" />
              <span className="text-sm text-gray-400">or</span>
              <div className="h-px w-full bg-gray-300" />
            </div>

            {/* Social Buttons */}
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center border rounded py-2 hover:bg-gray-50">
                <span className="mr-2">🎥</span> Sign Up with Google
              </button>
              <button className="w-full flex items-center justify-center border rounded py-2 hover:bg-gray-50">
                <span className="mr-2">📘</span> Sign Up with Facebook
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              By clicking "Sign Up", you agree to our{" "}
              <a href="#" className="text-blue-500 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 underline">
                Privacy Policy
              </a>
              .
            </p>
            <p className="text-sm text-center mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 underline">
                Login here
              </Link>
              .
            </p>
          </form>
        }
      </motion.div>
      <footer className="text-xs text-gray-400 mt-4">
        Made with <span className="text-blue-500 font-semibold">Visily</span>
      </footer>
    </div>
  );
}
