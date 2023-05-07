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

  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        await fetch('http://localhost:5000/cart/', { credentials: "include", method: "GET" })
        .then(async(response) =>{
          const jsonData = await response.json();
          setData(jsonData);
        })
        
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);


  const handleCheckOut = async () => {
    try {
      await fetch('http://localhost:5000/orders/create', { credentials: "include", method: "POST", headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      }, body: JSON.stringify("")})
      .then(async(response) =>{
        console.log("adding item")

        
      })
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };


  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
        {data ? (
        <div>
          <h2>Items:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <p>Total Items:  </p>
        </div>
      ) : (
        <p>You do not have any items in your cart.</p>
      )}
          
        </div>
        <div className="checkout">
          <h2>Schedule a pickup date</h2>
          <p>Pickup Date: </p>
          <input type="date" className="calendar-input"></input>
          <p></p>
          <button onClick={handleCheckOut}>Checkout</button>
        </div>
      </div>
    </div>
  );
}
