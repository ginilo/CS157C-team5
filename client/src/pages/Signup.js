import { React, useState } from "react";

export default function SignUp() {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div class="sign-container">
      <h1>SJSU Pantry</h1>
      <form class="form-container">
        <p id="sign-header">Sign Up</p>
        <label for = "username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleInputChange}
          required
        />
        <label for = "fname">First Name</label>
        <input
          type="text"
          name="fname"
          placeholder="First Name"
          value={form.fname}
          onChange={handleInputChange}
          required
        />
        <label for = "lname">Last Name</label>
        <input
          type="text"
          name="lname"
          placeholder="Last Name"
          value={form.lname}
          onChange={handleInputChange}
          required
        />
        <label for = "email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleInputChange}
          required
        />
        <label for = "phone">Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleInputChange}
        />
        <label for = "password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleInputChange}
          required
        />
        <button>Register</button>
      </form>
      <p>
        Already have an account? <a href="SignIn.js">Sign in</a>
      </p>
    </div>
  );
}
