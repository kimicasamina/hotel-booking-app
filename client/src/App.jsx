import { useState } from "react";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";
import Hotels from "./pages/Hotels";
import Hotel from "./pages/Hotel";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/hotels",
        element: <Hotels />,
      },
      {
        path: "/hotels/:id",
        element: <Hotel />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
