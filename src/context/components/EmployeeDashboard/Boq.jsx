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
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const boqResponse = await axios.get("http://localhost:5000/api/boq", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBoqEntries(boqResponse.data);
      } catch (error) {
        console.error(
          "Error fetching BOQ entries:",
          error.response ? error.response.data : error
        );
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
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/boq",
        newEntry,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedBoqEntries = [...boqEntries, response.data];
      setBoqEntries(updatedBoqEntries);
      calculateTotalCreditPoints(updatedBoqEntries);

      localStorage.setItem("boqEntries", JSON.stringify(updatedBoqEntries));

      setBoqFormData({ customerName: "", meetingTime: "", boqTime: "" });
    } catch (error) {
      console.error(
        "Error submitting BOQ entry:",
        error.response ? error.response.data : error
      );
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
    <div style={styles.container}>
      <h2 style={styles.heading}>BOQ Entry</h2>
      <form onSubmit={handleBoqSubmit} style={styles.boqForm}>
        <label htmlFor="customerName" style={styles.label}>
          Customer Name
        </label>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={boqFormData.customerName}
          onChange={handleBoqChange}
          required
          style={styles.input}
        />
        <label htmlFor="meetingTime" style={styles.label}>
          Meeting Time
        </label>
        <input
          type="datetime-local"
          name="meetingTime"
          value={boqFormData.meetingTime}
          onChange={handleBoqChange}
          required
          style={styles.input}
        />
        <label htmlFor="boqTime" style={styles.label}>
          BOQ Share Time
        </label>
        <input
          type="datetime-local"
          name="boqTime"
          value={boqFormData.boqTime}
          onChange={handleBoqChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Submit BOQ
        </button>
      </form>

      <h2 style={styles.heading}>BOQ Entries</h2>
      <h3 style={styles.salesSummary}>
        Total BOQ Credit Points (This Month):{" "}
        {salesTotalThisMonth >= 0
          ? `+${salesTotalThisMonth}`
          : salesTotalThisMonth}
      </h3>
      {boqEntries.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Customer Name</th>
              <th style={styles.tableHeader}>Meeting Time</th>
              <th style={styles.tableHeader}>BOQ Share Time</th>
              <th style={styles.tableHeader}>Total Process Time (hours)</th>
              <th style={styles.tableHeader}>Credit Points</th>
            </tr>
          </thead>
          <tbody>
            {boqEntries.map((entry, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>{entry.customerName}</td>
                <td style={styles.tableCell}>
                  {new Date(entry.meetingTime).toLocaleString()}
                </td>
                <td style={styles.tableCell}>
                  {new Date(entry.boqTime).toLocaleString()}
                </td>
                <td style={styles.tableCell}>
                  {parseFloat(entry.totalProcessTime).toFixed(2)}
                </td>
                <td
                  style={{
                    ...styles.tableCell,
                    color: entry.creditPoints >= 0 ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {entry.creditPoints >= 0
                    ? `+${entry.creditPoints}`
                    : entry.creditPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={styles.noEntries}>No BOQ entries yet.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "80%",
    maxWidth: "1200px",
    margin: "20px auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "2rem",
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  },
  label: {
    fontSize: "1rem",
    color: "#444",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    width: "100%",
  },
  button: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    border: "1px solid #ddd",
  },
  tableHeader: {
    padding: "10px",
    textAlign: "left",
    border: "1px solid #ddd",
    backgroundColor: "#f2f2f2",
    color: "#555",
  },
  tableCell: {
    padding: "10px",
    textAlign: "left",
    border: "1px solid #ddd",
    color: "#333",
  },
  salesSummary: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "20px",
  },
  noEntries: {
    textAlign: "center",
    color: "#888",
    fontSize: "1rem",
  },
};

export default BoqForm;
