import React from "react";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <Header />
      <h1 className="text-3xl font-bold text-center">
        Welcome to the Home Page!
      </h1>
      <p className="mt-4 text-center">The office buddies will join soon</p>
    </div>
  );
};

export default HomePage;
