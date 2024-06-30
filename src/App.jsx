import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UrlProvider from "./Context";
import AppLayout from "./layouts/app-layout";
import RequireAuth from "./components/require-auth";
import Auth from "./pages/auth";
import Dashboard from "./pages/Dashboard";
import RedirectLinkPage from "./pages/RedirectLinkPage";
import LandingPage from "./pages/LandingPage";
import Link from "./pages/link";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Link />
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLinkPage />,
      },
    ],
  },
]);

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
