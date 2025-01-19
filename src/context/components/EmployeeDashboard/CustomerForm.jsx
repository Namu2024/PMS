import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

const SalesForm = () => {
  const [salesFormData, setSalesFormData] = useState({
    customerName: "",
    leadTime: "",
    contactTime: "",
  });
  const [salesEntries, setSalesEntries] = useState([]);
  const [salesTotalThisMonth, setSalesTotalThisMonth] = useState(0);
  const [error, setError] = useState(""); // For error messages

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
        setError("Error fetching sales entries. Please try again.");
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

    if (
      new Date(salesFormData.leadTime) >= new Date(salesFormData.contactTime)
    ) {
      setError("Lead Time must be earlier than Contact Time.");
      return;
    }

    const leadTime = new Date(salesFormData.leadTime);
    const contactTime = new Date(salesFormData.contactTime);
    const totalProcessTime = (contactTime - leadTime) / (1000 * 60 * 60);
    const creditPoints = calculateCreditPoints(totalProcessTime);

    const newEntry = {
      ...salesFormData,
      totalProcessTime,
      creditPoints,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/sales",
        newEntry,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSalesEntries((prevEntries) => [...prevEntries, response.data]);
      calculateTotalCreditPoints([...salesEntries, response.data]);
      setSalesFormData({ customerName: "", leadTime: "", contactTime: "" });
      setError(""); // Clear error on successful submit
    } catch (error) {
      setError("Error submitting sales entry. Please try again.");
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

  const memoizedSalesEntries = useMemo(() => salesEntries, [salesEntries]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sales Entry</h2>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={handleSalesSubmit} style={styles.form}>
        <label
          htmlFor="customerName"
          style={styles.label}
          aria-label="Customer Name"
        >
          Customer Name
        </label>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={salesFormData.customerName}
          onChange={handleSalesChange}
          required
          style={styles.input}
        />
        <label htmlFor="leadTime" style={styles.label} aria-label="Lead Time">
          Lead Time
        </label>
        <input
          type="datetime-local"
          name="leadTime"
          value={salesFormData.leadTime}
          onChange={handleSalesChange}
          required
          style={styles.input}
        />
        <label
          htmlFor="contactTime"
          style={styles.label}
          aria-label="Contact Time"
        >
          Contact Time
        </label>
        <input
          type="datetime-local"
          name="contactTime"
          value={salesFormData.contactTime}
          onChange={handleSalesChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Submit Sales
        </button>
      </form>

      <h2 style={styles.heading}>Sales Entries</h2>
      <h3 style={styles.summary}>
        Total Sales Credit Points (This Month):{" "}
        {salesTotalThisMonth >= 0
          ? `+${salesTotalThisMonth.toFixed(2)}`
          : salesTotalThisMonth.toFixed(2)}
      </h3>
      {memoizedSalesEntries.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Customer Name</th>
              <th style={styles.th}>Lead Time</th>
              <th style={styles.th}>Contact Time</th>
              <th style={styles.th}>Total Process Time (hours)</th>
              <th style={styles.th}>Credit Points</th>
            </tr>
          </thead>
          <tbody>
            {memoizedSalesEntries.map((entry, index) => (
              <tr key={index}>
                <td style={styles.td}>{entry.customerName}</td>
                <td style={styles.td}>
                  {new Date(entry.leadTime).toLocaleString()}
                </td>
                <td style={styles.td}>
                  {new Date(entry.contactTime).toLocaleString()}
                </td>
                <td style={styles.td}>{entry.totalProcessTime.toFixed(2)}</td>
                <td
                  style={{
                    ...styles.td,
                    color: entry.creditPoints >= 0 ? "green" : "red",
                  }}
                >
                  {entry.creditPoints >= 0
                    ? `+${entry.creditPoints.toFixed(2)}`
                    : entry.creditPoints.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={styles.noEntries}>No sales entries yet.</p>
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
  form: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
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
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    border: "1px solid #ddd",
  },
  th: {
    padding: "10px",
    textAlign: "left",
    border: "1px solid #ddd",
    backgroundColor: "#f2f2f2",
    color: "#555",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  summary: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "1.2rem",
  },
  noEntries: {
    textAlign: "center",
    color: "#555",
    marginTop: "20px",
  },
  error: {
    color: "red",
    fontSize: "1rem",
    marginBottom: "20px",
    textAlign: "center",
  },
};

export default SalesForm;
