import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./Components/Register/RegisterPage";
import LoginPage from "./Components/Login/LoginPage";

//proxy srv port 5000

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Body from "./Components/Body/Body";
import CreateAd from "./Components/AdAdd/CreateAdd";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createAd" element={<CreateAd />} />
        <Route
          path="*"
          element={
            <>
              <Header />
              <Body />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
