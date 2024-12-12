import React, { useState } from "react";
import Select from "react-select";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userData");
      window.location.href = "/"; // Redirect to home after logout
    }
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } h-screen bg-gray-800 transition-all fixed sm:static`}
    >
      {/* Toggle Button */}
      <div className="flex justify-between items-center sm:hidden p-4 bg-gray-900">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? "Close" : "Open"}
        </button>
      </div>

      <div className={`flex flex-col ${isOpen ? "space-y-6 p-4" : "p-2"}`}>
        {/* Collapsible Sidebar Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden sm:block text-white focus:outline-none"
        >
          {isOpen ? "<<" : ">>"}
        </button>

        {/* Navigation Links */}
        <nav className={`space-y-4 ${isOpen ? "" : "hidden sm:block"}`}>
          <a
            href="/dashboard"
            className="block text-gray-200 hover:bg-gray-700 rounded-md px-4 py-2"
          >
            Dashboard
          </a>
          <a
            href="/createbill"
            className="block text-gray-200 hover:bg-gray-700 rounded-md px-4 py-2"
          >
            Create Bill
          </a>
          <a
            href="/settings"
            className="block text-gray-200 hover:bg-gray-700 rounded-md px-4 py-2"
          >
            Settings
          </a>
          <a
            href="/"
            className="block text-gray-200 hover:bg-gray-700 rounded-md px-4 py-2"
          >
            Go to Home
          </a>
          <button
            onClick={handleLogout}
            className="block text-gray-200 hover:bg-gray-700 rounded-md px-4 py-2 text-left"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
