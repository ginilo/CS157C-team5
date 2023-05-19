import React, { useState } from "react";

export default function EmployeeSignIn() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [valid, setValid] = useState(true);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:5000/login", {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(form),
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.text();
          if (data === "logged in") {
            setValid(true);
            window.location.href = "/EmployeePortal";
          } else {
            setValid(false);
          }
        } else
          throw new Error(
            `Server responded with ${response.status} ${response.statusText}`
          );
      })
      .catch((error) => {
        console.error("There was an error:", error);
      });
  };

  return (
    <div className="signin">
      <div className="sign-container">
        <h1>SJSU Pantry</h1>
        <form className="form-container" onSubmit={handleSubmit}>
          <p id="sign-header">Employee Login</p>
          {!valid && (
            <div className="error-message">Invalid username or password.</div>
          )}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleInputChange}
            required
          />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}
