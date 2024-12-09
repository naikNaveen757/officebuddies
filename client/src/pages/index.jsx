"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../components/Common/Header";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is "user"
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
        role, // Include the role in the API request
      });

      // Save token and user info in localStorage
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("role", response.data.role);

      console.log("User logged in:", response.data);

      // Redirect based on role
      if (response.data.role === "organizer") {
        router.push("/dashboard"); // Organizer dashboard
      } else {
        router.push("/home"); // Regular user home
      }
    } catch (err) {
      setError("Invalid credentials or role. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-background">
        <div className="bg-gray-300 dark:bg-gray-800 shadow-md rounded-lg w-full max-w-md p-6">
          <div className="flex justify-center h-48">
            <img src="/logo.svg" alt="Logo" className="w-64 h-64" />
          </div>

          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-red-500 text-center font-medium">{error}</p>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-600 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-600 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-gray-600 dark:text-gray-300"
              >
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="user">User</option>
                <option value="organizer">Organizer</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-500 hover:underline">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
