import React, { useState, useEffect } from "react";

export default function Orders() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      await fetch("http://localhost:5000/products/all")
        .then(async (response) => {
          const jsonData = await response.json();
          setData(jsonData);
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
    })();
  }, []);

  return (
    <div className="orders">
      <h1>Orders</h1>
      <h2>Popular Items</h2>
      <h2>Categories</h2>
      <h2>All Items</h2>
      {data ? (
        <div className = 'item-container'>
          {data.map((item, index) => (
            <div className = "items" key={index}>
              <p>{item.name}</p>
              <img src= {item.image} alt="grannyapple" border="0"></img>
              <p>Quantity: {item.quantity}</p>
              <button>Add to Cart</button>
            </div>
          ))}

        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
