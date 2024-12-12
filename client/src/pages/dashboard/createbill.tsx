import React, { useState, useEffect } from "react";
import Select from "react-select";

const CreateBill = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  
  useEffect(() => {
    // Fetch user details from API
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/ofcbd/userprofile"); // Replace with your API endpoint
        const responseData = await response.json();
  
        console.log("API Response:", responseData); // Debugging log
  
        // Safely handle cases where data is undefined or null
        if (responseData.data && Array.isArray(responseData.data)) {
          const options = responseData.data.map((user) => ({
            value: user.empId, // Assuming `empId` is the unique identifier
            label: user.name,
          }));
          setEmployeeOptions(options);
        } else {
          console.error("Invalid API response format:", responseData);
          setEmployeeOptions([]); // Set to an empty array to avoid further errors
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
  
    fetchUsers();
  }, []);
  
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const billData = {
      name,
      amount,
      participants: participants.map((p) => ({
        empId: p.value,
        share: amount / participants.length,
        status: "Pending",
      })),
    };

    console.log("Bill Data:", billData);
    // TODO: Send billData to the server
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Bill</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Bill Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter bill name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter amount"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Participants
          </label>
          <Select
            options={employeeOptions}
            isMulti
            value={participants}
            onChange={setParticipants}
            className="w-full"
            placeholder="Select participants"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create Bill
        </button>
      </form>
    </div>
  );
};

export default CreateBill;
