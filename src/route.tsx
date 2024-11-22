import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Root from "./pages/root";
import NotFound from "./pages/notfound";
import { lazy } from "react";
import LazyLoader from "./components/lazyLoader"
const EarnView = lazy(() => import('./pages/earn'));
const MintView = lazy(() => import('./pages/mint'));
const FriendsView = lazy(() => import('./pages/friends'));
const MeView = lazy(() => import('./pages/me'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // {
      //   index: true,
      //   element: <Home />,
      // },
      {
        index: true,
        element: (
          <LazyLoader>
            <EarnView />
          </LazyLoader>
        ),
      },
      {
        path: "/mint",
        element: (
          <LazyLoader>
            <MintView />
          </LazyLoader>
        ),
      },
      {
        path: "/friends",
        element: (
          <LazyLoader>
            <FriendsView />
          </LazyLoader>
        ),
      },
      {
        path: "/me",
        element: (
          <LazyLoader>
            <MeView />
          </LazyLoader>
        ),
      },
    ],
  },
]);

export default function CustomRouter() {
  return <RouterProvider router={router} />;
}
