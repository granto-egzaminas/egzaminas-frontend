import React, { useState } from "react";

const CreateAd = () => {
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          image,
          price,
          description,
          categoryId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Ad created successfully");
      } else {
        setMessage(`Ad creation failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Ad creation failed: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Create Ad</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Category ID:</label>
          <input
            type="text"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          />
        </div>
        <button type="submit">Create Ad</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateAd;
