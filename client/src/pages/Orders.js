import React, { useState, useEffect } from "react";


export default function Orders() {
  const [data, setData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [qty, setQty] = useState(0);

  useEffect(() => {
    fetchData();
  }, [selectedCategory, qty]);

  const fetchData = async () => {
    try {
      const url = selectedCategory
        ? `http://localhost:5000/products/all/${selectedCategory}`
        : "http://localhost:5000/products/all";

      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("There was an error:", error);
    }
  };

  const handleAdd = async (item) => {
    if (qty > 0) {
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
          item.quantity -= qty;
          console.log(item.quantity)
          console.log("adding item");
        });
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };

  const handleQuantityChange = (e, index) => {
    const newQuantity = parseInt(e.target.value, 10) || 0; // Parse the input value as an integer or default to 0
    const selectedItem = data[index];

    if (newQuantity > selectedItem.quantity) {
      console.log("Tried to input a number greater than In stock quantity.");
      setQty(0);
    } else if (newQuantity < 1) {
      setQty(0);
      console.log("Tried to input a number less than In stock quantity.");
    } else {
      setQty(newQuantity);
    }
  };

  const [showAlert, setShowAlert] = useState(null);

  const [popularList, setPopularList] = useState([]);

  useEffect(() => {
    (async () => {
      await fetch("http://localhost:5000/products/popular")
        .then(async (response) => {
          const jsonData = await response.json();
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
          setCategoryList(jsonData);
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
    })();
  }, []);

  const handleResetFilter = async () => {
    setSelectedCategory("");
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
        <form className="catFilter">
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
          <input
            type="button"
            value="Reset Filter"
            onClick={handleResetFilter}
          ></input>
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
                  min = "1"
                  className="quantity"
                  max = {item.quantity}
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
