import { useEffect, lazy, Suspense } from "react";
import { Outlet, createBrowserRouter, useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import { Container } from "@mui/material";
import Header from "./components/Header";

// We are using lazy loading to load the pages only when they are needed
// This will help users with a slower internet connection, as they will not have to download all the pages at once
const HomeView = lazy(() => import("./pages/Home"));
const ShowView = lazy(() => import("./pages/Show"));
const NotFoundView = lazy(() => import("./pages/NotFound"));

// This wrapper ensures that the page scrolls to the top when the route changes
function RouteWrapper() {
  const { pathname } = useLocation();

  useEffect(() => {
    // We only want smooth scrolling when the user is going to the home page
    const behavior = pathname === "/" ? "smooth" : "auto";
    setTimeout(() => window.scrollTo({ top: 0, behavior }));
  }, [pathname]);

  return (
    <Suspense
      fallback={
        <Container>
          <Loader size="large" />
        </Container>
      }
    >
      <Header />

      <Outlet />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    element: <RouteWrapper />,
    children: [
      {
        path: "/",
        element: <HomeView />,
      },
      {
        path: `/:id`,
        element: <ShowView />,
      },
      {
        path: "*",
        element: <NotFoundView />,
      },
    ],
  },
]);

export default router;
