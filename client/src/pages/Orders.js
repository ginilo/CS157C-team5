import React, { useState, useEffect } from "react";

export default function Orders() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      await fetch("http://localhost:5000/products/all")
        .then(async (response) => {
          const jsonData = await response.json();
          console.log(jsonData)
          setData(jsonData);
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
    })();
  }, []);

  const handleAdd = async (item) => {

    console.log(item);
    
    try {
      await fetch('http://localhost:5000/cart/add', { credentials: "include", method: "POST", headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      }, body: JSON.stringify(item)})
      .then(async(response) =>{
        console.log("adding item")

        
      })
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

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
              <button onClick = {() => handleAdd(item)}>Add to Cart</button>
            </div>
          ))}

        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
