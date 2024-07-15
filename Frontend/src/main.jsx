import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import "./index.css";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { ThemeDarkProvider } from "./Context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeDarkProvider>
        <AuthContextProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthContextProvider>
      </ThemeDarkProvider>
    </React.StrictMode>
  </BrowserRouter>
);
