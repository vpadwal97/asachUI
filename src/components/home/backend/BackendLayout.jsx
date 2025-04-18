import React from "react";
import { Outlet } from "react-router-dom"; // Renders child routes
import BackendFooter from "../components/BackendFooter"; // Your backend footer component
import BackendHeader from "../components/BackendHeader"; // Your backend header component

const BackendLayout = () => {
  return (
    <div>
      <BackendHeader />
      <main>
        <Outlet /> {/* Child routes will be rendered here */}
      </main>
      <BackendFooter />
    </div>
  );
};

export default BackendLayout;
