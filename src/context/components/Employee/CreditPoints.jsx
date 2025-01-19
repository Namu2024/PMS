import React, { useState, useEffect } from "react";
import axios from "axios";

const CreditPoints = () => {
  const [salesEntries, setSalesEntries] = useState([]);
  const [boqEntries, setBoqEntries] = useState([]);
  const [salesCreditPoints, setSalesCreditPoints] = useState(0);
  const [boqCreditPoints, setBoqCreditPoints] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch sales form entries
        const salesResponse = await axios.get(
          "http://localhost:5000/api/sales",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Fetch BOQ form entries
        const boqResponse = await axios.get("http://localhost:5000/api/boq", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSalesEntries(salesResponse.data);
        setBoqEntries(boqResponse.data);

        // Calculate month-wise credit points for the current month
        calculateMonthlyCreditPoints(salesResponse.data, setSalesCreditPoints);
        calculateMonthlyCreditPoints(boqResponse.data, setBoqCreditPoints);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to calculate total credit points for the current month
  const calculateMonthlyCreditPoints = (entries, setTotalCreditPoints) => {
    const currentMonth = new Date().getMonth();
    const totalPoints = entries
      .filter(
        (entry) => new Date(entry.leadTime).getMonth() === currentMonth // Month filter
      )
      .reduce((sum, entry) => sum + (entry.creditPoints || 0), 0);
    setTotalCreditPoints(totalPoints);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <style>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
        }
        .credit-summary {
          margin-bottom: 20px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #f9f9f9;
        }
        .error {
          color: red;
          font-weight: bold;
          margin: 20px 0;
        }
      `}</style>
      <h2>Employee Credit Points</h2>

      <div className="credit-summary">
        <h3>Total Sales Form Credit Points (This Month):</h3>
        <p>
          {salesCreditPoints >= 0
            ? `+${salesCreditPoints.toFixed(2)}`
            : salesCreditPoints.toFixed(2)}
        </p>
      </div>

      <div className="credit-summary">
        <h3>Total BOQ Form Credit Points (This Month):</h3>
        <p>
          {boqCreditPoints >= 0
            ? `+${boqCreditPoints.toFixed(2)}`
            : boqCreditPoints.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CreditPoints;
