import React from "react";
import { createBrowserRouter } from "react-router-dom";
import FrontendLayout from "../components/home/frontend/FrontendLayout.jsx";
import Homepage from "../components/home/frontend/HomePage.jsx";
import NotFound from "../components/pages/NotFound.jsx";
import Login from "../components/pages/backend/Login.jsx";
import CmsComponentDesign from "../components/pages/backend/cms/ThemeLayoutStructure/CmsComponentDesign.jsx";
import ColorExtractor from "../components/pages/frontEnd/ColorExtractor.jsx";
import FormComponent from "../components/pages/frontEnd/FormComponent.jsx";
import Table from "../components/pages/frontEnd/Table.jsx";
import Chat from "../components/pages/frontEnd/chat/Chat.jsx";
import ProtectedRoute from "../utils/ProtectedRoute.jsx";
import UnProtectedRoute from "../utils/UnProtectedRoute.jsx";

const Routing = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
    loadhotai
    <FrontendLayout />
    </>
    ,
    children: [
      // { path: "", element: "" },
      { path: "", element: <Homepage /> },
      { path: "form", element: <FormComponent /> },
      { path: "Chat", element: <Chat /> },
      { path: "ColorExtractor", element: <ColorExtractor /> },
      { path: "Table", element: <Table /> },

    ]
  },
  {
    path: "/backend/login",
    element: (
      <UnProtectedRoute>
        <Login />
      </UnProtectedRoute>
    )
  },
  {
    path: "/backend",
    element: <ProtectedRoute />,
    children: [
      {
        path: "Home",
        element: "home"
      },
      {
        path: "cms",
        element: "",
        children: [
          {
            path: "themeandlayout",
            element: "",
            children: [
              {
                path: "cmsComponentDesign",
                element: <CmsComponentDesign />
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default Routing;
