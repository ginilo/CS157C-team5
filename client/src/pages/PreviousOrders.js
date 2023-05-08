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

  const renderNestedObject = (obj) => {
  return Object.keys(obj).map((key, index) => {
    const value = obj[key];
    if (typeof value === "object" && value !== null) {
      return (
        <div key={index}>
         
          {renderNestedObject(value)}
        </div>
      );
    } else {
      return (
        <p key={index}>
          {key}: {value}
        </p>
      );
    }
  });
};

  return (
    <div className="prevOrders">
      <h1>Previous Orders</h1>
      {data && Object.keys(data).length > 0 ? (
        <div className="info-container">
          {Object.keys(data).map((key, index) => (
        <div className="items" key={index}>
          <p>{key}:</p>
          {renderNestedObject(data[key])}
        </div>
      ))}
        </div>
      ) : (
        <p>You do not have any past orders. </p>
      )}
    </div>
  );
}
