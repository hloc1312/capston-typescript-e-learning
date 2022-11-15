import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Organisms/Footer/Footer";
import Header from "../../Organisms/Header/Header";

const HomeTemplate = () => {
  return (
    <div className="HomeTemplate">
      <Header />
      <div className="HomeTemplate-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HomeTemplate;
