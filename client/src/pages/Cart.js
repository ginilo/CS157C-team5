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
        await fetch("http://localhost:5000/cart/", {
          credentials: "include",
          method: "GET",
        }).then(async (response) => {
          const jsonData = await response.json();
          setData(jsonData);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  const [date, setDate] = useState("");

  const handleInputChange = (event) => {
    setDate(event.target.value);
  };

  const handleCheckOut = async () => {
    try {
      await fetch("http://localhost:5000/orders/create", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify({ pickedDate: date }),
      }).then(async (response) => {
        console.log("checking out...");
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
        {data && Object.keys(data).length > 0  ? (
          <div className="cart-container">
          <div className="cart-items">
            <div>
              <h2>Items:</h2>
              <pre>{JSON.stringify(data, null, 2)}</pre>
              <p>Total Items: {Object.keys(data).length} </p>
            </div>
            
          </div>
          <div className="checkout">
              <h2>Schedule a pickup date</h2>
              <p>Pickup Date: </p>
              <form onSubmit={handleCheckOut}>
                <input
                  type="date"
                  onChange={handleInputChange}
                  value={date}
                  name="pickedDate"
                  className="calendar-input"
                  required
                ></input>
                <p></p>
                <button type="submit">Checkout</button>
              </form>
            </div>
          </div>
        ) : (
          <p>You do not have any items in your cart.</p>
        )}
      
    </div>
  );
}
