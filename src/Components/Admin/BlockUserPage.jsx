/** @format */

import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const BlockUserPage = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

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

  const handleBlockUser = async (userId) => {
    console.log("Deleting user with ID:", userId);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
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
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error deleting user: " + error.message);
    }
  };
  return (
    <div>
      <Header user={user} />
      <div className="content">
        <h2>Block Users</h2>
        {error && <p>{error}</p>}
        <ul>
          {users.length === 0 ? (
            <li>No users available</li>
          ) : (
            users.map((user) => (
              <li key={user._id}>
                {user.name} ({user.email})
                <button onClick={() => handleBlockUser(user._id)}>Block</button>
              </li>
            ))
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default BlockUserPage;
