import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function HouseForm() {
  const [house, setHouse] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchHouse = useCallback(async () => {
    if (id) {
      try {
        const response = await axios.get(`/api/houses/${id}`);
        setHouse(response.data);
      } catch (error) {
        console.error("Error fetching house:", error);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchHouse();
  }, [fetchHouse]);

  const handleChange = (e) => {
    setHouse({ ...house, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.patch(`/api/houses/${id}`, house);
      } else {
        await axios.post("/api/houses", house);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving house:", error);
    }
  };

  return (
    <div className="house-form">
      <h2>{id ? "Edit" : "Add"} House Listing</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={house.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={house.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={house.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="address"
          value={house.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <input
          type="number"
          name="bedrooms"
          value={house.bedrooms}
          onChange={handleChange}
          placeholder="Bedrooms"
          required
        />
        <input
          type="number"
          name="bathrooms"
          value={house.bathrooms}
          onChange={handleChange}
          placeholder="Bathrooms"
          required
        />
        <button type="submit" className="btn btn-primary">
          {id ? "Update" : "Add"} Listing
        </button>
      </form>
    </div>
  );
}

export default HouseForm;
