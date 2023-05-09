import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

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
            console.log("User not logged in.");
            window.location.href = "/SignIn";
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
      const cartData = await fetchCartData();
      setData(cartData);
    })();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart/", {
        credentials: "include",
        method: "GET",
      });
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching cart data:", error);
      return null;
    }
  };

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
        credentials: "include",
        body: JSON.stringify({ pickedDate: date }),
      }).then(async (response) => {
        console.log("checking out...");
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleDeleteClick = async (product_id, quantity) => {
    console.log(quantity);
    try {
      await fetch("http://localhost:5000/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ product_id, quantity }),
      }).then(async (response) => {
        console.log("Deleting...");
        const updatedCartData = await fetchCartData();
        setData(updatedCartData);
      });
      // Perform any necessary actions after deleting the item
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="cart">
      {data && Object.keys(data).length > 0 ? (
        <div className="cart-container">
          <div className="cart-items">

            <div className = "header">
            <FontAwesomeIcon icon={faShoppingBasket} />
            <h1>My Cart</h1>
            </div>

            <hr></hr>
            {data.map((item, index) => (
              <div>
                <div className="items" key={index}>
                  <img src={item.image_url} alt="item"></img>
                  <p>{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Category: {item.category}</p>
                  <p>Allergy: {item.allergy}</p>

                  <button
                    onClick={() =>
                      handleDeleteClick(item.product_id, item.quantity)
                    }
                  >
                    Delete
                  </button>
                </div>
                <hr></hr>
              </div>
            ))}
            <p>Total Items: {Object.keys(data).length} </p>
          </div>

          <div className="checkout">
            <h2>Schedule a pickup date</h2>
            <p>Pickup Date: </p>
            <form onSubmit={handleCheckOut}>
              <input
                type="datetime-local"
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
