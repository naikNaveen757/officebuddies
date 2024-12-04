"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";

const Registration = () => {
  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    email: "",
    password: "",
    role: "employee",
    dob: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("Welcome Buddy! Redirecting...");
        setTimeout(() => {
          router.push("/home");
        }, 2000);
      } else {
        setIsSuccess(false);
        setMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("Error occurred. Please try again.");
    }
  };

  return (
    <><Header /><div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-dark-background p-4">
      {/* Registration Form */}
      <div className="max-w-md w-full bg-gray-300 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-center h-48">
          <img src="/logo.svg" alt="Logo" className="w-64 h-64" />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
          Register
        </h2>

        {message && (
          <p
            className={`text-center mb-4 ${isSuccess ? "text-green-500" : "text-red-500"}`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="empId"
            placeholder="Employee ID"
            value={formData.empId}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-gray-200"
            required />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-gray-200"
            required />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-gray-200"
            required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-gray-200"
            required />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="employee">Employee</option>
            <option value="organizer">Organizer</option>
          </select>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-gray-200"
            required />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>

        {/* Login Option */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Already have an account?
          </p>
          <button
            onClick={() => router.push("/")}
            className="text-blue-500 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div></>
  );
};

export default Registration;
