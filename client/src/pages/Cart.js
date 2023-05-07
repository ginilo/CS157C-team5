import React, { useState, useEffect } from "react";

export default function Cart() {
  useEffect(() => {
    (async () => {
      await fetch("http://localhost:5000/login", { credentials: "include" })
        .then(async (response) => {
          const data = await response.json();
          if (data.loggedIn === true) {
            // loggedIn is true
            //do something
            // Further processing for logged in user
          } else {
            // loggedIn is false
            console.log("User not logged in");
            window.location.href = "/SignIn";
            // Further processing for non-logged in user
          }
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
    })();
  }, []);

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          <p>Total Items: </p>
        </div>
        <div className="checkout">
          <h2>Order Summary</h2>
          <p>Pickup Date: </p>
          <input type="date" class="calendar-input"></input>
        </div>
      </div>
    </div>
  );
}
