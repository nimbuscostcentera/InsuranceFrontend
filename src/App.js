import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/LoginPage";
import PageNotFound from "./Pages/PageNotFound";
import AuthLayout from "./Layout/AuthLayout";
import SalesUpload from "./Pages/SalesUpload/index";
import ForgotPass from "./Pages/LoginPage/ForgotPass";
import PolicyGen from "./Pages/PolicyGen/index";
import ProtectedRoute from "./Layout/ProtectedRoute";
import LinkPage from "./Pages/LinkPage/Index";
const App = createBrowserRouter([
  {
    path: "/", // Parent route for `/`
    element: <AuthLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "", // Resolves to `/`
        element: <Login />,
      },
      {
        path: "forgot-pass", // Resolves to `/`
        element: <ForgotPass />,
      },
    ],
  },
  {
    path: "/insurance", // Parent route for `/my`
    element: <ProtectedRoute />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "", // Resolves to `/my/about`
        element: <SalesUpload />,
      },
      {
        path: "policy", // Resolves to `/my/about`
        element: <PolicyGen />,
      },
      {
        path: "certificate", // Resolves to `/my/about`
        element: <LinkPage />,
      },
    ],
  },
]);

export default App;
