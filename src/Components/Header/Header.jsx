/** @format */

import React from "react";
import "./Header.css";

import logo_dark from "../../assets/logo-white.png";
import search_icon_dark from "../../assets/search-b.png";
import { useNavigate } from "react-router-dom";

const Header = ({ theme, setTheme, user }) => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <img src={logo_dark} alt="logo" className="logo" />
      <ul>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/about")}>About</li>
        <li onClick={() => navigate("/myads")}>Mano Skelbimai</li>
        <li onClick={() => navigate("/addad")}>Pridėti skelbimą</li>
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
        <img src={search_icon_dark} alt="search icon" />
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
