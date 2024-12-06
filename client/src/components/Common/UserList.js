import React, { useState, useEffect } from "react";
import axios from "axios";

const List = () => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState("");

  // Fetch user data from API
  const fetchPeople = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new Error("No auth token found. Please log in.");
      }

      const response = await axios.get("http://localhost:5000/api/birthdays", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("API Response:", response.data); // Debugging
      setPeople(response.data.data || []); // Ensure the response contains the data array
    } catch (err) {
      console.error("Error fetching user data:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch user data. Please try again.");
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  // Function to format birth date
  const formatBirthDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {people.length > 0 ? (
        <ul className="space-y-4">
          {people.map((person) => {
            const { id, name, birthDate, image } = person;
            return (
              <li
                key={id}
                className="flex items-center space-x-4 border-b pb-4 last:border-none"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-16 h-16 object-cover rounded-full shadow-md"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-700">{name}</h4>
                  <p className="text-gray-500">{formatBirthDate(birthDate)}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No users available.</p>
      )}
    </div>
  );
};

export default List;
