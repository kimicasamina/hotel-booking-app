import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { SearchContextProvider } from "./context/searchContext.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";

import axios from "axios";
axios.defaults.baseURL =
  "https://hotel-booking-app-fullstack-mern.onrender.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
