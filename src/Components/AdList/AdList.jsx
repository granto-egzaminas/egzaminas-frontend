import React, { useEffect, useState } from "react";
import AdCard from "../Card/AdCard";
import { Container, Title, Divider } from "@mantine/core";
import styles from "./AdList.module.css";

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

  return (
    <Container fluid>
      <Title align="center" mb="lg">
        All ads
      </Title>
      <div className={styles.adsList}>
        {ads.map((ad) => (
          <div key={ad._id}>
            <AdCard ad={ad} />
          </div>
        ))}
      </div>
      <Divider className={styles.divider} mt="md" />
    </Container>
  );
};

export default AdsList;
