import { useState, useEffect } from "react";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
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

  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4 ml-auto">
        {/* Notification Icon */}
        <div className="relative">
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            1
          </span>
          <img
            src="/notification-ring.svg"
            alt="Notification-icon"
            className="w-6 h-6 text-light-text dark:text-dark-text"
          />
        </div>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-light-background dark:bg-dark-background border border-gray-300 dark:border-gray-600 text-light-text dark:text-dark-text transition-all"
        >
          {isDarkMode ? "🌙" : "🌞"}
        </button>
      </div>
    </header>
  );
};

export default Header;
