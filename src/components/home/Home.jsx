import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import MainBody from "./MainBody";
const Home = () => {
  return (
    <>
      <div className="page bg-darktext-white position-relative">
        <Header />
        <MainBody />
        <Footer />
      </div>
    </>
  );
};

export default Home;
