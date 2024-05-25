import React, { useEffect, useState } from "react";
import AdCard from "../Card/AdCard";
import "./Body.css";

const AdsList = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/ads/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAds(data.ads);
        } else {
          console.error("Failed to fetch ads", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
        setError(error.message);
      }
    };

    fetchAds();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  console.log(userId);

  return (
    <div className="adsContainer">
      <div>
        <h1>Ads List</h1>
      </div>
      <ul className="ads">
        {ads.map((ad) => (
          <li key={ad._id}>
            <AdCard ad={ad} userId={userId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdsList;
