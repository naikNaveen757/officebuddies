"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsLoggedIn(true);
    }

    if (localStorage.getItem("darkMode") === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header className="container mx-auto p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4 ml-auto">
        {/* Notification Icon*/}
        {router.pathname === "/home" && (
          <div className="relative">
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
            <img
              src="/notification-ring.svg"
              alt="Notification-icon"
              className="w-10 h-8 text-light-text dark:text-dark-text"
            />
          </div>
        )}

        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-light-background dark:bg-dark-background border border-gray-300 dark:border-gray-600 text-light-text dark:text-dark-text transition-all"
        >
          {isDarkMode ? "🌙" : "🌞"}
        </button>

        {/* Logout Icon*/}
        {router.pathname === "/home" && isLoggedIn && (
          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-light-background dark:bg-dark-background border border-gray-300 dark:border-gray-600 text-light-text dark:text-dark-text transition-all"
          >
            <img src="/logout.svg" alt="Logout" className="w-6 h-6" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
