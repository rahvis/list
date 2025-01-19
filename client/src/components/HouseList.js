import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HouseList() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await axios.get('/api/houses');
      setHouses(response.data);
    } catch (error) {
      console.error('Error fetching houses:', error);
    }
  };

  const deleteHouse = async (id) => {
    try {
      await axios.delete(`/api/houses/${id}`);
      fetchHouses();
    } catch (error) {
      console.error('Error deleting house:', error);
    }
  };

  return (
    <div className="house-list">
      <h2>House Listings</h2>
      <div className="house-grid">
        {houses.map((house) => (
          <div key={house._id} className="house-card">
            <h3>{house.title}</h3>
            <p>{house.address}</p>
            <p>Price: ${house.price}</p>
            <p>{house.bedrooms} bed, {house.bathrooms} bath</p>
            <div className="house-actions">
              <Link to={`/edit/${house._id}`} className="btn btn-edit">Edit</Link>
              <button onClick={() => deleteHouse(house._id)} className="btn btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HouseList;

