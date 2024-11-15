import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Index from "./pages";
import Home from "./pages/home";
import Root from "./pages/root";
import NotFound from "./pages/notfound";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

//export default router;
export default function CustomRouter() {
  return <RouterProvider router={router} />
}

