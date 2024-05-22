import React from "react";
import "./Header.css";

import logo_dark from "../../assets/logo-white.png";
import search_icon_dark from "../../assets/search-b.png";
import { useNavigate } from "react-router-dom";

const Header = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  return (

    <div className="navbar">
      <img src={logo_dark} alt="logo" className="logo" />
      <ul>
        <li onClick={() => navigate("/")}>Home</li>
        <li ocClick={() => navigate("/about")}>About</li>
        <li ocClick={() => navigate("/")}>Mano Skelbimai</li>
        <li ocClick={() => navigate("/myads")}>Pridėti skelbimą</li>
      </ul>
      <div className="search-box">
        <input type="text" placeholder="search" />
        <img src={search_icon_dark} alt="" />
      </div>
      <button
        className="RegisterBtn"
        type={"submit"}
        onClick={() => navigate("/register")}
      >
        Register
      </button>
      <button
        className="LoginBtn"
        type={"submit"}
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
};
<div className="navbar">
  <img src={logo_dark} alt="logo" className="logo" />
  <ul>
    <li>Home</li>
    <li>About</li>
    <li>Fav</li>
    <li>Likes</li>
    <li>Mano Skelbimai</li>
  </ul>
  <div className="search-box">
    <input type="text" placeholder="search" />
    <img src={search_icon_dark} alt="" />
  </div>

  <button className="LoginBtn" type={"submit"}>
    Login
  </button>
</div>;

    <div className='navbar'>
        <img src={theme=== "light"? logo_light: logo_dark} alt="logo" className='logo'/>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Fav</li>
            <li>Likes</li>
            <li>Mano Skelbimai</li>
            <li>Pridėti skelbimą</li>
        </ul>
        <div className='search-box'>
            <input type="text" placeholder='search' />
            <img src={theme ==="light" ? search_icon_light :  search_icon_dark} alt="" />
        </div>
        <img onClick={()=>{toggleTheme()}} src={theme=== 'light'? toogle_light: toogle_dark} alt="" className='toggle-icon' />
        <button className='LoginBtn' type={'submit'} >Login</button>
        </div>
  )
}


export default Header;
