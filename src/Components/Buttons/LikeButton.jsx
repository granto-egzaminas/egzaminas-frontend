import React, { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import { AiOutlineHeart } from "react-icons/ai";

export default function LikeButton({ adId }) {
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    fetchLikesCount();
  }, []);

  const fetchLikesCount = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/likes/ad/${adId}`
      );
      if (response.ok) {
        const data = await response.json();
        setLikesCount(data.likes.length);
      } else {
        console.error(`${data.error}`);
      }
    } catch (error) {
      console.error(`Failed to fetch likes count: ${error.message}`);
    }
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/likes/ad/${adId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setLikesCount((prevCount) => prevCount + 1); // Increment likes count
      } else {
        console.error("Failed to like the ad");
      }
    } catch (error) {
      console.error(`Failed to like the ad: ${error.message}`);
    }
  };

  return (
    <Button
      onClick={handleLike}
      size="sm"
      variant="outline"
      rightSection={<AiOutlineHeart />}
    >
      {likesCount} Likes
    </Button>
  );
}
