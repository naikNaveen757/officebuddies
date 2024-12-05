import React from "react";
import Header from "../components/Header";
import List from "../components/UserList";
// import ProgressBar from "@/components/Progressbar";
import ProgressBar from "@ramonak/react-progress-bar";

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <Header />
      <h1 className="text-3xl font-bold text-center">
        Welcome to the Home Page!
      </h1>
      <List />
    </div>
  );
};

export default HomePage;
