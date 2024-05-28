import React, { useEffect, useState } from "react";
import AdCard from "../Card/AdCard";
import { Container, Title, Divider, TextInput } from "@mantine/core";
import { UseNavigate, useNavigate } from "react-router-dom";
import classes from "./UserAdsList.module.css";
import styles from "./UserAdsList.module.css";

const UserAdsList = () => {
  const [ads, setAds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAds = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      // checkinam ar gauna token, userid
      const userId = user ? user._id : null;
      console.log("Token:", token);
      console.log("User id:", userId);

      try {
        const response = await fetch(
          `http://localhost:5000/api/ads/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setAds(data.ads);
        } else {
          console.error("Failed to fetch user ads", response.StatusText);
        }
      } catch (error) {
        console.error("Error fetching user ads:", error);
        setError(error.message);
      }
    };
    fetchUserAds();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredAds = ads.filter((ad) =>
    ad.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Container fluid>
      <a className={classes.link} href="" onClick={() => navigate("/")}>
        Home
      </a>
      <Title align="center" mb="lg">
        My Ads
      </Title>
      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className={styles.search}
      />
      <div className={styles.adsList}>
        {filteredAds.length > 0 ? (
          filteredAds.map((ad) => (
            <div key={ad._id}>
              {console.log(ad)}
              <AdCard ad={ad} />
            </div>
          ))
        ) : (
          <p>No ads found</p>
        )}
      </div>
      <Divider className={styles.divider} mt="md" />
    </Container>
  );
};

export default UserAdsList;
