import React, { useState, useEffect } from "react";

export default function Orders() {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      await fetch(`http://localhost:5000/products/all/${selectedCategory}`)
        .then(async (response) => {
          const jsonData = await response.json();
          setData(jsonData);
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
    })();
  }, []);

  const handleAdd = async (item) => {
    setShowAlert(item);

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
    item["qty"] = qty;
    try {
      await fetch("http://localhost:5000/cart/add", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(item),
      }).then(async (response) => {
        console.log("adding item");
      });
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const [qty, setQty] = useState(0);

  const handleQuantityChange = (e, index) => {
    const newQuantity = parseInt(e.target.value, 10) || 0; // Parse the input value as an integer or default to 0
    setQty(newQuantity);
  };

  const [showAlert, setShowAlert] = useState(null);

  const [popularList, setPopularList] = useState([]);

  useEffect(() => {
    (async () => {
      await fetch("http://localhost:5000/products/popular")
        .then(async (response) => {
          const jsonData = await response.json();
          console.log(jsonData);
          setPopularList(jsonData);
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
    })();
  }, []);

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      await fetch("http://localhost:5000/products/category/categories/all")
        .then(async (response) => {
          const jsonData = await response.json();
          console.log(jsonData);
          setCategoryList(jsonData);
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
    })();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:5000/products/all/${selectedCategory}`)
      .then(async (response) => {
        const jsonData = await response.json();
        setData(jsonData);
      })
      .catch((error) => {
        console.error("There was an error:", error);
      });
  };

  return (
    <div>
      {showAlert && (
        <div className="alert">
          <span>
            You added {showAlert.qty} {showAlert.name} to your cart.{" "}
          </span>
        </div>
      )}
      <div className="orders">
        <h1>Orders</h1>
        <h2>Popular Items</h2>
        {popularList ? (
          <div className="item-container">
            {popularList.map((item, index) => (
              <div className="items" key={index}>
                <p>{item.name}</p>
                <img src={item.image_url} alt="item"></img>
                <p>In Stock: {item.quantity}</p>
                <label htmlFor="quantity">Qty:</label>
                <input
                  type="number"
                  min="1"
                  className="quantity"
                  max={item.quantity}
                  value={item.quantitySelected}
                  onChange={(e) => handleQuantityChange(e, index)}
                />
                <button onClick={() => handleAdd(item)}>Add to Cart</button>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading data...</p>
        )}

        <h2>Categories</h2>
        <form className="catFilter" onSubmit={handleSubmit}>
          {categoryList.map((item, index) => (
            <div>
              <label>
                <input
                  key={index}
                  type="radio"
                  name="category"
                  value={item}
                  checked={selectedCategory === item}
                  onChange={(event) => setSelectedCategory(event.target.value)}
                ></input>
                <span>{item}</span>
              </label>
            </div>
          ))}
          <button type="submit">Filter</button>
          <input type="button" value="Reset Filter"></input>
        </form>

        {data ? (
          <div className="item-container">
            {data.map((item, index) => (
              <div className="items" key={index}>
                <p>{item.name}</p>
                <img src={item.image_url} alt="item"></img>
                <p>In Stock: {item.quantity}</p>
                <label htmlFor="quantity">Qty:</label>
                <input
                  type="number"
                  min="1"
                  className="quantity"
                  max={item.quantity}
                  value={item.quantitySelected}
                  onChange={(e) => handleQuantityChange(e, index)}
                />
                <button onClick={() => handleAdd(item)}>Add to Cart</button>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
}
