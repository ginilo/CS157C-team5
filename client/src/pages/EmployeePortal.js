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

      <form>
        <h1>Update a Product</h1>
        <input
          type="text"
          name="delid"
          placeholder="Product ID"
          value={delid}
          onChange={changeDelid}
          required
        />

        <p>What would you like to update?</p>
        <select>
          <option value="option1">Name</option>
          <option value="option2">Image URL</option>
          <option value="option3">Category</option>
          <option value="option4">Allergy</option>
          <option value="option5">Quantity</option>
        </select>
        <input
          type="text"
          name="updateField"
          required
        />

        <button>Update</button>
      </form>

      <form onSubmit={deleteProduct}>
        <h1>Delete a Product</h1>
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

      <form>
        <h1>Orders to be Fulfilled</h1>
        <button>Save</button>
      </form>
    </div>
  );
}
