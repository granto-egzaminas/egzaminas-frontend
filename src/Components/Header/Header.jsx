import React from "react";
import "./Header.css";

import { useNavigate } from "react-router-dom";

const Header = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <ul>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/about")}>About</li>
        <li onClick={() => navigate("/myAds")}>Mano Skelbimai</li>
        <li onClick={() => navigate("/createAd")}>Pridėti skelbimą</li>
        {user && user.role === "admin" && (
          <>
            <li onClick={() => navigate("/add-category")}>Add Category</li>
            <li onClick={() => navigate("/block-ad")}>Block Ad</li>
            <li onClick={() => navigate("/block-user")}>Block User</li>
          </>
        )}
      </ul>
      <div className="search-box">
        <input type="text" placeholder="search" />
      </div>
      <button
        className="RegisterBtn"
        type="button"
        onClick={() => navigate("/register")}
      >
        Register
      </button>
      <button
        className="LoginBtn"
        type="button"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
};

export default Header;
