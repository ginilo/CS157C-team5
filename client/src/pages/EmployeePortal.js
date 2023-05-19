import React, { useState, useEffect } from "react";

export default function EmployeePortal() {
  const initialFormState = {
    name: "",
    quantity: "",
    image_url: "",
    category: "",
    allergy: "",
  };

  const [form, setForm] = useState(initialFormState);

  const resetForm = () => {
    setForm(initialFormState);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const createProduct = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:5000/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      credentials: "include",
      body: JSON.stringify(form),
    })
      .then(async (response) => {
        if (response.ok) {
          console.log("Creating product...");
          resetForm();
        } else
          throw new Error(
            `Server responded with ${response.status} ${response.statusText}`
          );
      })
      .catch((error) => {
        console.error("There was an error:", error);
      });
  };

  const [delid, setDelid] = useState("");

  const changeDelid = (e) => {
    const newID = parseInt(e.target.value, 10) || 0;
    setDelid(newID);
  };

  const deleteProduct = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:5000/products/item/delete/${delid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      credentials: "include",
    })
      .then(async (response) => {
        if (response.ok) {
          console.log("Deleting product...");
        } else
          throw new Error(
            `Server responded with ${response.status} ${response.statusText}`
          );
      })
      .catch((error) => {
        console.error("There was an error:", error);
      });
  };

  const [updateid, setUpdateid] = useState("");

  const [data, setData] = useState(null);

  const displayProduct = async (e) => {
    e.preventDefault();
    const newID = parseInt(e.target.value, 10) || 0;
    setUpdateid(newID);
    setChangeForm({ ...changeform, product_id: newID });
  };

  const showDetails = async () => {
    if (updateid) {
      await fetch(`http://localhost:5000/products/item/${updateid}`, {
        method: "GET",
      })
        .then(async (response) => {
          const jsonData = await response.json();
          setData(jsonData);
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
    }
  };

  useEffect(() => {
    showDetails();
  }, [updateid]);

  const [changeform, setChangeForm] = useState({
    change: "",
    field: "name",
    product_id: "",
  });



  const handleFieldChange = (e) => {
   const selectedField = e.target.value;
    setChangeForm({ ...changeform, field: selectedField });
  };

  const handleChangeChange = (e) => {
    const newValue = e.target.value;
    setChangeForm({ ...changeform, change: newValue });
  };

  const updateProduct = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:5000/products/item/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      credentials: "include",
      body: JSON.stringify(changeform),
    })
      .then(async (response) => {
        if (response.ok) {
          console.log("Updating Product...");
        } else
          throw new Error(
            `Server responded with ${response.status} ${response.statusText}`
          );
      })
      .catch((error) => {
        console.error("There was an error:", error);
      });
  };

  const [orderdata, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/orders/FOrders");
        if (response.ok) {
          const orders = await response.json();
          // Handle the orders data as needed

          setOrderData(orders);
        } else {
          throw new Error(
            `Server responded with ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("There was an error:", error);
      }
    };

    // Call the fetchOrders function when the component mounts
    fetchOrders();
  }, []);

  const [unfulfilleddata, setUFOrderData] = useState(null);

  useEffect(() => {
    const fetchUFOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/orders/UFOrders");
        if (response.ok) {
          const orders = await response.json();
          // Handle the orders data as needed

          setUFOrderData(orders);
        } else {
          throw new Error(
            `Server responded with ${response.status} ${response.statusText}`
          );
        }
      } catch (error) {
        console.error("There was an error:", error);
      }
    };

    // Call the fetchOrders function when the component mounts
    fetchUFOrders();
  }, []);

  const [selectedOrderId, setSelectedOrderId] = useState("");

  const handleOrderSelection = (event) => {
    setSelectedOrderId(event.target.value);
  };

  const fufillOrder = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:5000/orders/FulfillOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      credentials: "include",
      body: JSON.stringify({ order_id: selectedOrderId }),
    })
      .then(async (response) => {
        if (response.ok) {
          console.log("Fulfilling order...");
          window.location.reload()
        } else
          throw new Error(
            `Server responded with ${response.status} ${response.statusText}`
          );
      })
      .catch((error) => {
        console.error("There was an error:", error);
      });
  };

  return (
    <div className="employee-container">
      <h1>Employee Portal</h1>

      <form className="productForm" onSubmit={createProduct}>
        <h1>Create a Product</h1>
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="name">Quantity</label>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          name="image_url"
          placeholder="Image"
          value={form.image_url}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="allergy">Allergy</label>
        <input
          type="text"
          name="allergy"
          placeholder="Allergy"
          value={form.allergy}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Create</button>
      </form>

      <form onSubmit={updateProduct}>
        <h1>Update a Product</h1>
        <label htmlFor="updateid">Product ID: </label>
        <input
          type="text"
          name="updateid"
          placeholder="Product ID"
          value={updateid}
          onChange={displayProduct}
          required
        />

        {data && Object.keys(data).length > 0 ? (
          <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          <p>Choose a product to update.</p>
        )}

        <p>What would you like to update?</p>
        <select value={changeform.field} onChange={handleFieldChange}>
          <option value="name" name="name">
            Name
          </option>
          <option value="image_url" name="image_url">
            Image URL
          </option>
          <option value="category" name="category">
            Category
          </option>
          <option value="allergy" name="allergy">
            Allergy
          </option>
          <option value="quantity" name="quantity">
            Quantity
          </option>
        </select>
        <input
          type="text"
          name="change"
          value={changeform.change}
          onChange={handleChangeChange}
          required
        />

        <button type="submit">Update</button>
      </form>

      <form onSubmit={deleteProduct}>
        <h1>Delete a Product</h1>
        <label htmlFor="delid">Product ID: </label>
        <input
          type="text"
          name="delid"
          placeholder="Product ID"
          value={delid}
          onChange={changeDelid}
          required
        />

        <button>Delete</button>
      </form>

      <form onSubmit={fufillOrder}>
        <h1>Orders to be Fulfilled</h1>

        {unfulfilleddata && Object.keys(unfulfilleddata).length > 0 ? (
          <ul className="uforderList">
            {unfulfilleddata.map((order, index) => (
              <li key={index}>
                <input
                  type="radio"
                  name="fulOption"
                  value={order.order_id}
                  onChange={handleOrderSelection}
                />
                {`${order.order_id}`}
                <div className="pendingOrder">
                  {Object.keys(order).map((key) => (
                    <p>
                      {key}: {order[key]}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No unfulfilled orders.</p>
        )}
        <button type="submit">Save</button>
      </form>

      <h1>Fulfilled Orders</h1>
      {orderdata && Object.keys(orderdata).length > 0 ? (
        <div>
          {orderdata.map((order, index) => (
                <div className="fulOrders">
                  {Object.keys(order).map((key) => (
                    <div className = "fulOrdersItem">
                      {key}: {order[key]}
                    </div>
                  ))}
                </div>
              
            ))}
        </div>
      ) : (
        <p>No fulfilled orders.</p>
      )}
    </div>
  );
}
