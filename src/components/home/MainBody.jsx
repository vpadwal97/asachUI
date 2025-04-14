import React from "react";
import { Outlet } from "react-router-dom";

function MainBody() {
  return (
    <>
      <main id="main" className="main">
        <Outlet />
      </main>
    </>
  );
}

export default MainBody;
