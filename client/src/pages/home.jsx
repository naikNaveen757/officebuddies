import React from "react";
import Header from "../components/Common/Header";
import List from "../components/Common/UserList";

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
