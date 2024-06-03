/** @format */

// BlockAdPage.js
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import AdCard from "../Card/AdCard";
import styles from "./BlockAdPage.module.css";
import { Card, Button, Modal, Group, Text } from "@mantine/core"; // Import Mantine components

const BlockAdPage = ({ user }) => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

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

  const handleBlockAd = async () => {
    if (!selectedAd) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/ads/${selectedAd}`,
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
      setAds((prevAds) => prevAds.filter((ad) => ad._id !== selectedAd));
      setModalOpened(false);
      setSelectedAd(null);
    } catch (error) {
      console.error("Error blocking ad:", error);
      setError("Error blocking ad.");
    }
  };

  const openModal = (adId) => {
    setSelectedAd(adId);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
    setSelectedAd(null);
  };

  return (
    <div>
      <Header user={user} />
      <div className="content">
        <h2>Block Ads</h2>
        {error && <p>{error}</p>}
        <div className={styles.adsGrid}>
          {ads.length === 0 ? (
            <p>No ads available</p>
          ) : (
            ads.map((ad) => (
              <Card key={ad._id} shadow="sm" padding="lg">
                <AdCard ad={ad} />
                <Button color="red" onClick={() => openModal(ad._id)}>
                  Block
                </Button>
              </Card>
            ))
          )}
        </div>
      </div>
      <Footer />
      <Modal opened={modalOpened} onClose={closeModal} title="Confirm Block">
        <Text>Are you sure you want to block this ad?</Text>
        <Group position="apart" mt="md">
          <Button variant="default" onClick={closeModal}>
            Cancel
          </Button>
          <Button color="red" onClick={handleBlockAd}>
            Block
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default BlockAdPage;
