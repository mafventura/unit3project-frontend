import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router } from "react-router-dom";
import { ToDosProvider } from "./context/ToDosContext";
import { UsersProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
      <UsersProvider>
        <ToDosProvider>
          <Router>
            <App />
          </Router>
        </ToDosProvider>
      </UsersProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
