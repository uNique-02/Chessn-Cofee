import React, { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (isLogin) {
      console.log("Logging in with", formData);
      // Add login logic here
    } else {
      console.log("Signing up with", formData);
      // Add signup logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Admin Login" : "Admin Signup"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {!isLogin && (
          <>
            <div className="flex items-center justify-center space-x-2 mt-6">
              <div className="h-px w-full bg-gray-300" />
              <span className="text-sm text-gray-400">or</span>
              <div className="h-px w-full bg-gray-300" />
            </div>

            {/* Social Buttons */}
            <div className="space-y-2 mt-4">
              <button className="w-full flex items-center justify-center border rounded py-2 hover:bg-gray-50">
                <span className="mr-2">🎥</span> Sign Up with Google
              </button>
              <button className="w-full flex items-center justify-center border rounded py-2 hover:bg-gray-50">
                <span className="mr-2">📘</span> Sign Up with Facebook
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              By signing up, you agree to our{" "}
              <a href="#" className="text-blue-500 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 underline">
                Privacy Policy
              </a>
              .
            </p>
          </>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-indigo-600 font-medium hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
}
