import { Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Show from "./pages/Show";
import NotFound from "./pages/NotFound";

// This wrapper ensures that the page scrolls to the top when the route changes
function RouteWrapper() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    element: <RouteWrapper />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: `/:id`,
        element: <Show />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
