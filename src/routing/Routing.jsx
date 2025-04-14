import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../components/home/Home.jsx";
import Chat from "../components/pages/Chat.jsx";
import ColorExtractor from "../components/pages/ColorExtractor.jsx";
import NotFound from "../components/pages/NotFound.jsx";

const Routing = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      { path: '', element: "" },
      { path: 'Chat', element: <Chat /> },
      { path: 'ColorExtractor', element: <ColorExtractor /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default Routing;
