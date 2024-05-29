/** @format */

// BlockAdPage.js

import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const BlockAdPage = ({ user }) => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/ads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAds(data.ads);
    } catch (error) {
      console.error("Error fetching ads:", error);
      setError("Error fetching ads.");
    }
  };

  const handleBlockAd = async (adId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/ads/${adId}`, // Use the correct endpoint for deleting ads
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setAds((prevAds) => prevAds.filter((ad) => ad._id !== adId));
    } catch (error) {
      console.error("Error blocking ad:", error);
      setError("Error blocking ad.");
    }
  };

  return (
    <div>
      <Header user={user} />
      <div className="content">
        <h2>Block Ads</h2>
        {error && <p>{error}</p>}
        <ul>
          {ads.length === 0 ? (
            <li>No ads available</li>
          ) : (
            ads.map((ad) => (
              <li key={ad._id}>
                {ad.description}
                <button onClick={() => handleBlockAd(ad._id)}>Block</button>
              </li>
            ))
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default BlockAdPage;
