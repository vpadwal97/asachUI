import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const FrontendLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Child routes will be rendered here */}
      </main>
      <Footer />
    </div>
  );
};

export default FrontendLayout;
