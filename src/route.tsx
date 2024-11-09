import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Index from "./pages";
import Root from "./pages/root";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Index />,
      },
    ],
  },
]);

export default router;
