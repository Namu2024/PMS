import React, { useState, useEffect } from "react";
import axios from "axios";

const SalesForm = () => {
  const [salesFormData, setSalesFormData] = useState({
    customerName: "",
    leadTime: "",
    contactTime: "",
  });
  const [salesEntries, setSalesEntries] = useState([]);
  const [salesTotalThisMonth, setSalesTotalThisMonth] = useState(0);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = localStorage.getItem("token");
        const salesResponse = await axios.get(
          "http://localhost:5000/api/sales",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSalesEntries(salesResponse.data);
        calculateTotalCreditPoints(salesResponse.data);
      } catch (error) {
        console.error("Error fetching sales entries:", error);
      }
    };

    fetchEntries();
  }, []);

  const handleSalesChange = (e) => {
    const { name, value } = e.target;
    setSalesFormData({ ...salesFormData, [name]: value });
  };

  const handleSalesSubmit = async (e) => {
    e.preventDefault();

    const leadTime = new Date(salesFormData.leadTime);
    const contactTime = new Date(salesFormData.contactTime);
    const totalProcessTime = (contactTime - leadTime) / (1000 * 60 * 60);
    const creditPoints = calculateCreditPoints(totalProcessTime);

    const newEntry = {
      ...salesFormData,
      totalProcessTime: totalProcessTime,
      creditPoints: creditPoints,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/sales",
        newEntry,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSalesEntries([...salesEntries, response.data]);
      calculateTotalCreditPoints([...salesEntries, response.data]);
      setSalesFormData({ customerName: "", leadTime: "", contactTime: "" });
    } catch (error) {
      console.error("Error submitting sales entry:", error);
    }
  };

  const calculateCreditPoints = (totalProcessTime) => {
    let creditPoints = 0;
    if (totalProcessTime <= 2) creditPoints = 100;
    else if (totalProcessTime <= 3) creditPoints = 50;
    else if (totalProcessTime <= 4) creditPoints = -50;
    else if (totalProcessTime <= 5) creditPoints = -100;
    else creditPoints = -200;
    return creditPoints;
  };

  const calculateTotalCreditPoints = (entries) => {
    const currentMonth = new Date().getMonth();
    const totalPoints = entries
      .filter((entry) => new Date(entry.leadTime).getMonth() === currentMonth)
      .reduce((sum, entry) => sum + (entry.creditPoints || 0), 0);
    setSalesTotalThisMonth(totalPoints);
  };

  return (
    <div className="container">
      <style>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
        }
        .sales-form {
          margin-bottom: 20px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .sales-form label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
        }
        .sales-form input {
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .sales-form button {
          padding: 10px 15px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .sales-form button:hover {
          background-color: #0056b3;
        }
        .sales-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .sales-table th,
        .sales-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .sales-table th {
          background-color: #f4f4f4;
          font-weight: bold;
        }
        .sales-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
      `}</style>
      <h2>Sales Entry</h2>
      <form onSubmit={handleSalesSubmit} className="sales-form">
        <label htmlFor="customerName">Customer Name</label>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={salesFormData.customerName}
          onChange={handleSalesChange}
          required
        />
        <label htmlFor="leadTime">Lead Time</label>
        <input
          type="datetime-local"
          name="leadTime"
          value={salesFormData.leadTime}
          onChange={handleSalesChange}
          required
        />
        <label htmlFor="contactTime">Contact Time</label>
        <input
          type="datetime-local"
          name="contactTime"
          value={salesFormData.contactTime}
          onChange={handleSalesChange}
          required
        />
        <button type="submit">Submit Sales</button>
      </form>

      <h2>Sales Entries</h2>
      <h3>
        Total Sales Credit Points (This Month):{" "}
        {salesTotalThisMonth >= 0
          ? `+${salesTotalThisMonth.toFixed(2)}`
          : salesTotalThisMonth.toFixed(2)}
      </h3>
      {salesEntries.length > 0 ? (
        <table className="sales-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Lead Time</th>
              <th>Contact Time</th>
              <th>Total Process Time (hours)</th>
              <th>Credit Points</th>
            </tr>
          </thead>
          <tbody>
            {salesEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.customerName}</td>
                <td>{new Date(entry.leadTime).toLocaleString()}</td>
                <td>{new Date(entry.contactTime).toLocaleString()}</td>
                <td>{entry.totalProcessTime.toFixed(2)}</td>
                <td>
                  {entry.creditPoints >= 0
                    ? `+${entry.creditPoints.toFixed(2)}`
                    : entry.creditPoints.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No sales entries yet.</p>
      )}
    </div>
  );
};

export default SalesForm;
