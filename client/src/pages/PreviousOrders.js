import React, { useState, useEffect } from "react";

export default function PreviousOrders() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      await fetch("http://localhost:5000/login", { credentials: "include" })
        .then(async (response) => {
          const data = await response.json();
          if (data.loggedIn === true) {
            // loggedIn is true

            fetchOrders();
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

  const fetchOrders = async () => {
    try {
      await fetch("http://localhost:5000/orders/id", {
        credentials: "include",
        method: "GET",
      }).then(async (response) => {
        const jsonData = await response.json();
        setData(jsonData);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="prevOrders">
      <h1>Previous Orders</h1>
      {data ? (
        <div className="info-container">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>You do not have any past orders. </p>
      )}
    </div>
  );
}
