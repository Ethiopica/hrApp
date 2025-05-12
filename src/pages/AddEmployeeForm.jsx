import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./AddEmployeeForm.css";

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    salary: "",
    phone: "",
    email: "",
    animal: "",
    startDate: "",
    location: "",
    department: "",
    skills: "",
  });

  const [formMessage, setFormMessage] = useState("");
  const [lastId, setLastId] = useState(0);
  
  const navigate = useNavigate();

  // 🔄 Fetch employees on mount to get the last used ID
  useEffect(() => {
    axios
      .get("http://localhost:3001/employees")
      .then((res) => {
        const employees = res.data;
        const maxId = employees.reduce((max, emp) => (emp.id > max ? emp.id : max), 0);
        setLastId(maxId);
      })
      .catch((err) => {
        console.error("Failed to fetch employees:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.title ||
      !formData.salary ||
      !formData.phone ||
      !formData.email ||
      !formData.startDate ||
      !formData.location ||
      !formData.department
    ) {
      setFormMessage("⚠️ Please fill in all required fields.");
      return;
    }

    const skillsArray = formData.skills.split(",").map((skill) => skill.trim());

    const newEmployee = {
      id: lastId + 1, // ✅ assign next available ID
      ...formData,
      salary: parseFloat(formData.salary),
      skills: skillsArray,
    };

    try {
      await axios.post("http://localhost:3001/employees", newEmployee);
      setFormMessage("✅ Employee added successfully!");
      navigate("/employees");
    } catch (error) {
      console.error("Error adding employee:", error);
      setFormMessage("❌ Failed to add employee. Please try again.");
    }

    // Reset the form
    setFormData({
      name: "",
      title: "",
      salary: "",
      phone: "",
      email: "",
      animal: "",
      startDate: "",
      location:"",
      department: "",
      skills: "",
    });
  };

  return (
    <div className="add-employee-form">
      <h1>Add New Employee</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <input type="number" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="text" name="animal" placeholder="Favorite Animal (e.g. 🐶)" value={formData.animal} onChange={handleChange} />
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
        <input type="location" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
        <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
        <input type="text" name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange} />
        <button type="submit">Add Employee</button>
      </form>
      {formMessage && <p className="form-message">{formMessage}</p>}
    </div>
  );
};

export default AddEmployeeForm;
