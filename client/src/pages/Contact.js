import React from "react";

export default function Contact() {
  return (
    <div class="contact">
      <h1>Contact Us</h1>
      <form class="form-container">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required />
        <label for="email">Email</label>
        <input type="text" id="email" name="email" required />
        <label for="subject">Subject</label>
        <input type="text" id="subject" name="subject" required />
        <label for="message">Message</label>
        <textarea id="message" name="message" required></textarea>

        <button>Send Message</button>
      </form>

      <h2>Spartan Pantry Staff Spring 2023</h2>

      <h2>Developers</h2>

      <div class="developers">
        <div class="dev">
          <img
            src="https://i.ibb.co/Mc6LfDh/logo.png"
            alt="logo"
            border="0"
          ></img>
          <h3>Angela Yang</h3>
          <p>angela.yang@sjsu.edu</p>
        </div>

        <div class="dev">
          <img
            src="https://i.ibb.co/Mc6LfDh/logo.png"
            alt="logo"
            border="0"
          ></img>
          <h3>Gini Lo</h3>
          <p>gini.lo@sjsu.edu</p>
        </div>

        <div class="dev">
          <img
            src="https://i.ibb.co/Mc6LfDh/logo.png"
            alt="logo"
            border="0"
          ></img>
          <h3>Barnabas Yuen</h3>
          <p>barnabas.yuen@sjsu.edu</p>
        </div>
      </div>

      <p>All student staff can be reached directly by email.</p>
    </div>
  );
}
