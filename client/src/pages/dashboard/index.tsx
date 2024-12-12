import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./sidebar";

interface Participant {
  empId: string;
  share: number;
}

interface Bill {
  _id: string;
  name: string;
  amount: number;
  participants: Participant[];
  status: "paid" | "unpaid";
  createdAt: string;
}

const Dashboard = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [error, setError] = useState("");

  // Fetch bills data
  const fetchBills = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const authToken = userData?.authToken;

      if (!authToken) {
        throw new Error("No auth token found. Please log in.");
      }

      const response = await axios.get("http://localhost:5000/ofcbd/fetchbill", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (Array.isArray(response.data.bills)) {
        setBills(response.data.bills);
      } else {
        throw new Error("Invalid API response format.");
      }
    } catch (err) {
      console.error("Error fetching bills:", err.response?.data || err.message);
      setError("Failed to fetch bills. Please try again.");
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // Process data for visualization
  const calculateSummary = () => {
    const summary = { paid: 0, unpaid: 0 };

    bills?.forEach((bill) => {
      if (bill.status === "paid") summary.paid++;
      else summary.unpaid++;
    });

    return summary;
  };

  const summary = calculateSummary();

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-4 lg:p-6">
        <h1 className="text-2xl font-bold mb-4">Organizer Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow p-4 rounded text-center">
            <h2 className="text-xl font-semibold">Total Bills</h2>
            <p className="text-3xl font-bold">{bills.length}</p>
          </div>
          <div className="bg-white shadow p-4 rounded text-center">
            <h2 className="text-xl font-semibold">Paid Bills</h2>
            <p className="text-3xl font-bold">{summary.paid}</p>
          </div>
          <div className="bg-white shadow p-4 rounded text-center">
            <h2 className="text-xl font-semibold">Unpaid Bills</h2>
            <p className="text-3xl font-bold">{summary.unpaid}</p>
          </div>
        </div>

        {/* Bill Details Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Bill Details</h2>
          <div className="bg-white shadow mt-2 p-4 rounded">
            {bills.length > 0 ? (
              <div className="space-y-4">
                {bills.map((bill) => (
                  <div
                    key={bill._id}
                    className="border rounded p-4 bg-gray-50 hover:bg-gray-100"
                  >
                    <h3 className="text-lg font-semibold">{bill.name}</h3>
                    <p className="text-sm text-gray-600">
                      Amount: ₹{bill.amount}
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        bill.status === "paid" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      Status: {bill.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      Created At: {new Date(bill.createdAt).toLocaleString()}
                    </p>
                    <h4 className="mt-2 font-semibold">Participants:</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-600">
                      {bill.participants.map((participant) => (
                        <li key={participant.empId}>
                          Employee ID: {participant.empId}, Share: ₹
                          {participant.share}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p className="text-gray-600 mt-2">No bills available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
