import { useState } from "react";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";
import Hotels from "./pages/Hotels";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
