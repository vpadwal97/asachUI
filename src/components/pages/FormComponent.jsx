import axios from "axios";
import React, { useEffect, useState } from "react";

function FormComponent() {
  const base_UrlS = process.env.REACT_APP_BASE_URL;

  const [form, setForm] = useState({
    id: "",
    fname: "",
    mname: "",
    lname: "",
    dob: "",
    gender: ""
  });

  const [formList, setFormList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditMode(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      await axios.put(`${base_UrlS}/api/form/editForm`, form, {
        headers: { "Content-Type": "application/json" }
      });
      alert("Form updated!");
    } else {
      await axios.post(`${base_UrlS}/api/form/saveForm`, form, {
        headers: { "Content-Type": "application/json" }
      });
      alert("Form submitted!");
    }

    setForm({
      id: "",
      fname: "",
      mname: "",
      lname: "",
      dob: "",
      gender: ""
    });
    setIsEditMode(false);
    handleGetSavedForms();
  };

  const handleGetSavedForms = async () => {
    const response = await axios.get(`${base_UrlS}/api/form/getSaveFormData`);
    setFormList(response.data || []);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      await axios.delete(`${base_UrlS}/api/form/deleteForm/${id}`);
      alert("Form deleted!");
      handleGetSavedForms();
    }
  };

  useEffect(() => {
    handleGetSavedForms();
  }, []);

  return (
    <div>
      <h2>{isEditMode ? "Edit Form" : "Submit Form"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="fname"
          placeholder="First Name"
          value={form.fname}
          onChange={handleChange}
        />
        <br />
        <input
          name="mname"
          placeholder="Middle Name"
          value={form.mname}
          onChange={handleChange}
        />
        <br />
        <input
          name="lname"
          placeholder="Last Name"
          value={form.lname}
          onChange={handleChange}
        />
        <br />
        <input
          name="dob"
          type="date"
          value={form.dob}
          onChange={handleChange}
        />
        <br />
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br />
        <button type="submit">{isEditMode ? "Update" : "Submit"}</button>
      </form>

      <hr />

      <h2>Saved Form Data</h2>
      {formList.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>First</th>
              <th>Middle</th>
              <th>Last</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formList.map((item) => (
              <tr key={item.id}>
                <td>{item.fname}</td>
                <td>{item.mname}</td>
                <td>{item.lname}</td>
                <td>{item.dob}</td>
                <td>{item.gender}</td>
                <td>{item.timestamp}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FormComponent;
