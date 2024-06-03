/** @format */

import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Card, Button, Modal, Group, Text } from "@mantine/core";

const BlockUserPage = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Error fetching users.");
    }
  };

  const handleBlockUser = async () => {
    if (!selectedUser) return;

    console.log("Deleting user with ID:", selectedUser);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/users/${selectedUser}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} - ${errorMessage}`
        );
      }
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== selectedUser)
      );
      setModalOpened(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error deleting user: " + error.message);
    }
  };

  const openModal = (userId) => {
    setSelectedUser(userId);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <Header user={user} />
      <div className="content">
        <h2>Block Users</h2>
        {error && <p>{error}</p>}
        <Group>
          {users.length === 0 ? (
            <p>No users available</p>
          ) : (
            users.map((user) => (
              <Card key={user._id} shadow="sm" padding="lg">
                <Text>
                  {user.name} ({user.email})
                </Text>
                <Button onClick={() => openModal(user._id)}>Block</Button>
              </Card>
            ))
          )}
        </Group>
      </div>
      <Footer />
      <Modal opened={modalOpened} onClose={closeModal} title="Confirm Block">
        <Text>Are you sure you want to block this user?</Text>
        <Group position="apart" mt="md">
          <Button variant="default" onClick={closeModal}>
            Cancel
          </Button>
          <Button color="red" onClick={handleBlockUser}>
            Block
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default BlockUserPage;
