import { React, useState } from "react";

export default function SignUp() {
  const initialFormState = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    account_type: "student",
  };

  const [form, setForm] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  
  const [valid, setValid] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:5000/account/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      credentials: 'include',
      body: JSON.stringify(form),
    })
      .then(async (response) => {
        if (response.ok) {
          if (await response.text() === "exists") {
            
            setValid(false);
            return response;
          } else {
            setValid(true);
            window.location.href = "/Profile";
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
    <div className="sign-container">
      <h1>SJSU Pantry</h1>

      <form className="form-container" onSubmit={handleSubmit}>
        <p id="sign-header">Sign Up</p>
        
        {!valid && (
          <div className="status">
            This username already exists.
          </div>
        )}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          name="fname"
          placeholder="First Name"
          value={form.fname}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          name="lname"
          placeholder="Last Name"
          value={form.lname}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/SignIn">Sign in</a>
      </p>
    </div>
  );
}
