import React, { useState, useEffect } from "react";
import axios from "axios";

const BoqForm = () => {
  const [boqFormData, setBoqFormData] = useState({
    customerName: "",
    meetingTime: "",
    boqTime: "",
  });

  const [boqEntries, setBoqEntries] = useState([]);
  const [salesTotalThisMonth, setSalesTotalThisMonth] = useState(0);

  // Load BOQ entries from localStorage or API
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const savedBoqEntries = localStorage.getItem("boqEntries");
        if (savedBoqEntries) {
          setBoqEntries(JSON.parse(savedBoqEntries));
        } else {
          const boqResponse = await axios.get("http://localhost:5000/boq");
          setBoqEntries(boqResponse.data);
        }
      } catch (error) {
        console.error("Error fetching BOQ entries:", error);
      }
    };

    fetchEntries();
  }, []);

  const handleBoqChange = (e) => {
    const { name, value } = e.target;
    setBoqFormData({ ...boqFormData, [name]: value });
  };

  const calculateProcessTime = (meetingTime, boqTime) => {
    const meeting = new Date(meetingTime);
    const boq = new Date(boqTime);
    const diffInMs = boq - meeting;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours.toFixed(2);
  };

  const calculateCreditPoints = (totalProcessTime) => {
    if (totalProcessTime <= 2) return 100;
    if (totalProcessTime <= 3) return 50;
    if (totalProcessTime <= 4) return -50;
    if (totalProcessTime <= 5) return -100;
    return -200;
  };

  const handleBoqSubmit = async (e) => {
    e.preventDefault();

    const { meetingTime, boqTime, customerName } = boqFormData;

    if (!customerName || !meetingTime || !boqTime) {
      alert("Please fill in all fields");
      return;
    }

    const totalProcessTime = calculateProcessTime(meetingTime, boqTime);
    const creditPoints = calculateCreditPoints(totalProcessTime);

    const newEntry = {
      ...boqFormData,
      totalProcessTime,
      creditPoints,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/sales",
        newEntry
      );
      const updatedBoqEntries = [...boqEntries, response.data];
      setBoqEntries(updatedBoqEntries);
      calculateTotalCreditPoints(updatedBoqEntries);

      // Save updated BOQ entries to localStorage
      localStorage.setItem("boqEntries", JSON.stringify(updatedBoqEntries));

      // Reset form
      setBoqFormData({ customerName: "", meetingTime: "", boqTime: "" });
    } catch (error) {
      console.error("Error submitting BOQ entry:", error);
    }
  };

  const calculateTotalCreditPoints = (entries) => {
    const currentMonth = new Date().getMonth();
    const totalPoints = entries
      .filter(
        (entry) => new Date(entry.meetingTime).getMonth() === currentMonth
      )
      .reduce((sum, entry) => sum + (entry.creditPoints || 0), 0);
    setSalesTotalThisMonth(totalPoints);
  };

  return (
    <div className="container">
      <h2>BOQ Entry</h2>
      <form onSubmit={handleBoqSubmit} className="boq-form">
        <label htmlFor="customerName">Customer Name</label>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={boqFormData.customerName}
          onChange={handleBoqChange}
          required
        />
        <label htmlFor="meetingTime">Meeting Time</label>
        <input
          type="datetime-local"
          name="meetingTime"
          value={boqFormData.meetingTime}
          onChange={handleBoqChange}
          required
        />
        <label htmlFor="boqTime">BOQ Share Time</label>
        <input
          type="datetime-local"
          name="boqTime"
          value={boqFormData.boqTime}
          onChange={handleBoqChange}
          required
        />
        <button type="submit">Submit BOQ</button>
      </form>

      <h2>BOQ Entries</h2>
      <h3>
        Total BOQ Credit Points (This Month):{" "}
        {salesTotalThisMonth >= 0
          ? `+${salesTotalThisMonth}`
          : salesTotalThisMonth}
      </h3>
      {boqEntries.length > 0 ? (
        <table className="boq-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Meeting Time</th>
              <th>BOQ Share Time</th>
              <th>Total Process Time (hours)</th>
              <th>Credit Points</th>
            </tr>
          </thead>
          <tbody>
            {boqEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.customerName}</td>
                <td>{new Date(entry.meetingTime).toLocaleString()}</td>
                <td>{new Date(entry.boqTime).toLocaleString()}</td>
                <td>{parseFloat(entry.totalProcessTime).toFixed(2)}</td>
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
        <p>No BOQ entries yet.</p>
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

export default BoqForm;
