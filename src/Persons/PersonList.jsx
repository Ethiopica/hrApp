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

  if (now.getDate() < start.getDate()) {
    return totalMonths - 1;
  }

  return totalMonths;
};

const PersonList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3001/employees");
      setEmployees(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch employees");
      setLoading(false);
    }
  };

  const startEditing = (id, field, currentValue) => {
    setEditingField({ id, field });
    setEditValue(currentValue);
  };

  const saveChanges = async (id) => {
    try {
      const updatedField = {
        [editingField.field]:
          editingField.field === "skills"
            ? editValue.split(",").map((skill) => skill.trim())
            : editValue,
      };

      await axios.patch(`http://localhost:3001/employees/${id}`, updatedField);

      setEditingField(null);
      setEditValue("");
      fetchEmployees();
    } catch (err) {
      setError("Failed to update employee");
    }
  };

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/employees/${id}`);
      setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));
    } catch (err) {
      setError("Failed to delete employee");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
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
          <div key={employee.id} className="personCard">
            <p>Name: {employee.name}</p>
            <p>Title: {employee.title}</p>

            {/* Editable Salary */}
            <p>
              Salary:{" "}
              {editingField?.id === employee.id && editingField?.field === "salary" ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={() => saveChanges(employee.id)}>Save</button>
                  <button onClick={() => setEditingField(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {employee.salary}&nbsp;
                  <button onClick={() => startEditing(employee.id, "salary", employee.salary)}>
                    Edit
                  </button>
                </>
              )}
            </p>

            <p>Phone: {employee.phone}</p>
            <p>Email: {employee.email}</p>
            <p>Animal: {employee.animal}</p>
            <p>Start Date: {employee.startDate}</p>
            <p>Years Worked: {yearsWorked}</p>
            {specialMessage}

            {/* Editable Location */}
            <p>
              Location:{" "}
              {editingField?.id === employee.id && editingField?.field === "location" ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={() => saveChanges(employee.id)}>Save</button>
                  <button onClick={() => setEditingField(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {employee.location}&nbsp;
                  <button onClick={() => startEditing(employee.id, "location", employee.location)}>
                    Edit
                  </button>
                </>
              )}
            </p>

            {/* Editable Department */}
            <p>
              Department:{" "}
              {editingField?.id === employee.id && editingField?.field === "department" ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={() => saveChanges(employee.id)}>Save</button>
                  <button onClick={() => setEditingField(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {employee.department}&nbsp;
                  <button
                    onClick={() =>
                      startEditing(employee.id, "department", employee.department)
                    }
                  >
                    Edit
                  </button>
                </>
              )}
            </p>

            {/* Editable Skills */}
            <p>
              Skills:{" "}
              {editingField?.id === employee.id && editingField?.field === "skills" ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Comma-separated skills"
                  />
                  <button onClick={() => saveChanges(employee.id)}>Save</button>
                  <button onClick={() => setEditingField(null)}>Cancel</button>
                </>
              ) : (
                <>
                  {Array.isArray(employee.skills)
                    ? employee.skills.join(", ")
                    : "N/A"}&nbsp;
                  <button
                    onClick={() =>
                      startEditing(
                        employee.id,
                        "skills",
                        Array.isArray(employee.skills)
                          ? employee.skills.join(", ")
                          : ""
                      )
                    }
                  >
                    Edit
                  </button>
                </>
              )}
            </p>

            {/* Horizontal line before delete */}
            <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />

            {/* ❌ Delete Button */}
            <button onClick={() => deleteEmployee(employee.id)} className="deleteBtn">
              ❌ Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PersonList;







