import React, { useEffect, useState } from "react";
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
    <div className="adsContainer ">
      <div>
        <h1>Ads List</h1>
      </div>
      <ul className="ads ">
        {ads.map((ad) => (
          <li key={ad._id}>
            <img src={ad.image} alt={ad.description} />
            <p>Price: {ad.price}</p>
            <p>Description: {ad.description}</p>
            <p>Category: {ad.category_id.name}</p>
            <div className="likeContainer">
              <p>{ad.like_ids.length} likes</p>
              {ad.like_ids.some((like) => like.user_id === userId) ? (
                <div className="likedLike likeIcon" /> // full square
              ) : (
                <div className="unlikedLike likeIcon" /> //empty square
              )}
            </div>
            <p>{ad.comment_ids.length} comments</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdsList;
