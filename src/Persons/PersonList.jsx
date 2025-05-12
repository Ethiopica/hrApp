import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Person.css";

// Calculate years worked
const calculateYearsWorked = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();

  const isBeforeAnniversary =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());

  if (isBeforeAnniversary) {
    years--;
  }

  return years >= 0 ? years : 0;
};

// Calculate months worked
const calculateMonthsWorked = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();

  const yearDiff = now.getFullYear() - start.getFullYear();
  const monthDiff = now.getMonth() - start.getMonth();
  const totalMonths = yearDiff * 12 + monthDiff;

  // Account for partial month
  if (now.getDate() < start.getDate()) {
    return totalMonths - 1;
  }

  return totalMonths;
};

const PersonList = () => {
  const [employees, setEmployees] = useState([]); // State to store employees data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    // Fetch employee data from backend API
    axios
      .get("http://localhost:3001/employees")
      .then((response) => {
        setEmployees(response.data); // Set employee data from response
        setLoading(false); // Set loading to false
      })
      .catch((err) => {
        setError(err.message); // Set error message if request fails
        setLoading(false); // Set loading to false
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <p>Loading...</p>; // Show loading message while data is being fetched
  }

  if (error) {
    return <p>Error: {error}</p>; // Show error message if there was an issue with the request
  }

  return (
    <div className="personList">
      {employees.map((employee) => {
        const yearsWorked = calculateYearsWorked(employee.startDate);
        const monthsWorked = calculateMonthsWorked(employee.startDate);

        let specialMessage = null;
        if (yearsWorked > 0 && yearsWorked % 5 === 0) {
          specialMessage = <p>🎉 Schedule recognition meeting.</p>;
        } else if (monthsWorked < 6) {
          specialMessage = <p>🔔 Schedule probation review.</p>;
        }

        return (
          <div key={employee.id}>
            <p>Name: {employee.name}</p>
            <p>Title: {employee.title}</p>
            <p>Salary: {employee.salary}</p>
            <p>Phone: {employee.phone}</p>
            <p>Email: {employee.email}</p>
            <p>Animal: {employee.animal}</p>
            <p>Start Date: {employee.startDate}</p>
            <p>Years Worked: {yearsWorked}</p>
            {specialMessage}
            <p>Location: {employee.location}</p>
            <p>Department: {employee.department}</p>
            <p>Skills: {employee.skills.join(", ")}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PersonList;







