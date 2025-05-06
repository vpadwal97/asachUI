import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import FrontendLayout from "../components/home/frontend/FrontendLayout.jsx";


const Homepage =  lazy(() => import("../components/home/frontend/HomePage.jsx"));
const NotFound =  lazy(() => import("../components/pages/NotFound.jsx"));
const Login =  lazy(() => import("../components/pages/backend/Login.jsx"));
const MediaGallary =  lazy(() => import("../components/pages/backend/cms/ElementDataSetup/MediaGallary.jsx"));
const CmsComponentDesign =  lazy(() => import("../components/pages/backend/cms/ThemeLayoutStructure/CmsComponentDesign.jsx"));
const ColorExtractor =  lazy(() => import("../components/pages/frontEnd/ColorExtractor.jsx"));
const FormComponent =  lazy(() => import("../components/pages/frontEnd/FormComponent.jsx"));
const Table =  lazy(() => import("../components/pages/frontEnd/Table.jsx"));
const Chat =  lazy(() => import("../components/pages/frontEnd/chat/Chat.jsx"));
const ProtectedRoute =  lazy(() => import("../utils/ProtectedRoute.jsx"));
const UnProtectedRoute =  lazy(() => import("../utils/UnProtectedRoute.jsx"));

const Routing = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <FrontendLayout />
      </>
    ),
    children: [
      // { path: "", element: "" },
      { path: "", element: <Homepage /> },
      { path: "form", element: <FormComponent /> },
      { path: "Chat", element: <Chat /> },
      { path: "ColorExtractor", element: <ColorExtractor /> },
      { path: "Table", element: <Table /> }
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
          },
          {
            path: "elementDataSetup",
            element: "",
            children: [
              {
                path: "mediaGallary",
                element: <MediaGallary />
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
