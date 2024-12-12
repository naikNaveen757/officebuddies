import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

const List = () => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState("");

  const fetchPeople = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const authToken = userData ? userData.authToken : null;
      const loggedInEmpId = userData ? userData.empId : null;

      if (!authToken) {
        throw new Error("No auth token found. Please log in.");
      }

      const response = await axios.get(
        "http://localhost:5000/ofcbd/userprofile",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const filteredPeople = response.data.data.filter(
        (person) => person.empId !== loggedInEmpId
      );
      console.log("Filtered People:", filteredPeople);

      setPeople(filteredPeople || []);
    } catch (err) {
      console.error(
        "Error fetching user data:",
        err.response?.data || err.message
      );
      setError(
        err.response?.data?.message ||
          "Failed to fetch user data. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const formatBirthDate = (date) => {
    return dayjs(date).format("MMMM D, YYYY");
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {people.length > 0 ? (
        <ul className="space-y-4">
          {people.map((person) => {
            const { id, name, dob, image } = person;
            return (
              <li
                key={id}
                className="flex items-center space-x-4 border-b pb-4 last:border-none"
              >
                {image ? (
                  <img
                    src={image}
                    alt={name}
                    className="w-16 h-16 object-cover rounded-full shadow-md"
                  />
                ) : (
                  <span
                    className="w-16 h-16 flex items-center justify-center rounded-full shadow-md bg-gray-200 text-2xl"
                    role="img"
                    aria-label="Fallback Emoji"
                  >
                    😀
                  </span>
                )}
                <div>
                  <h4 className="text-lg font-semibold text-gray-700">
                    {name}
                  </h4>
                  <p className="text-gray-500">{formatBirthDate(dob)}</p>
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
