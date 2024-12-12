import React from "react";
import Header from "../components/Common/Header";
import List from "../components/Common/UserList";
import ProtectedRoute from "../components/Common/ProtectedRoute";

const HomePage = () => {
  return (
    <ProtectedRoute>
    <div className="container mx-auto p-4">
      <Header />
      <List />
      <div></div>
    </div>
    </ProtectedRoute>

  );
};

export default HomePage;
