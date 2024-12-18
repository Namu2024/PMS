import axios from "axios";

export const fetchDepartments = async () => {
  let departments = []; // Initialize departments as an empty array
  try {
    const response = await axios.get("http://localhost:5000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.success) {
      departments = response.data.departments; // Assign departments if the API call is successful
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    } else {
      console.error("Error fetching departments:", error);
      alert("Failed to fetch departments.");
    }
  }
  return departments; // Ensure departments are returned
};
