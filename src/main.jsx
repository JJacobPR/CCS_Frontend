import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeView from "./routes/HomeView.jsx";
import LoginView from "./routes/LoginView.jsx";
import RegisterView from "./routes/RegisterView.jsx";
import "./App.scss";
import UserView from "./routes/UserView.jsx";
import { CookiesProvider } from "react-cookie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
  {
    path: "/register",
    element: <RegisterView />,
  },
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "/user",
    element: <UserView />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <RouterProvider router={router} />
    </CookiesProvider>
  </React.StrictMode>
);
