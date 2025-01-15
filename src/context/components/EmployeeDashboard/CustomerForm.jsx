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
        const salesResponse = await axios.get(
          "http://localhost:5000/api/sales"
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

  const calculateProcessTime = (leadTime, contactTime) => {
    const lead = new Date(leadTime);
    const contact = new Date(contactTime);
    const diffInMs = contact - lead;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours.toFixed(2); // Format to 2 decimal places
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

  const handleSalesSubmit = async (e) => {
    e.preventDefault();

    const leadTime = new Date(salesFormData.leadTime);
    const contactTime = new Date(salesFormData.contactTime);
    const totalProcessTime = (contactTime - leadTime) / (1000 * 60 * 60); // in hours
    const creditPoints = calculateCreditPoints(totalProcessTime);

    const newEntry = {
      ...salesFormData,
      totalProcessTime: totalProcessTime,
      creditPoints: creditPoints,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/sales",
        newEntry
      );
      setSalesEntries([...salesEntries, response.data]);
      calculateTotalCreditPoints([...salesEntries, response.data]);
      setSalesFormData({ customerName: "", leadTime: "", contactTime: "" });
    } catch (error) {
      console.error("Error submitting sales entry:", error);
    }
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
          ? `+${salesTotalThisMonth}`
          : salesTotalThisMonth}
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
                <td>{entry.totalProcessTime}</td>
                <td>
                  {entry.creditPoints >= 0
                    ? `+${entry.creditPoints}`
                    : entry.creditPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No sales entries yet.</p>
      )}

      <style jsx>{`
        .container {
          width: 80%;
          margin: 0 auto;
          padding: 20px;
        }

        .sales-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .sales-form label {
          font-size: 1rem;
          font-weight: bold;
        }

        .sales-form input {
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .sales-form button {
          padding: 10px;
          font-size: 1rem;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .sales-form button:hover {
          background-color: #45a049;
        }

        .sales-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .sales-table th,
        .sales-table td {
          padding: 10px;
          text-align: left;
          border: 1px solid #ddd;
        }

        .sales-table th {
          background-color: #f4f4f4;
        }

        .sales-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .sales-table tr:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );
};

export default SalesForm;
