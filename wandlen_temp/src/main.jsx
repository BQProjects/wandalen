import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "./i18n.js";
import i18n from "./i18n.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <Toaster />
      <App />
    </I18nextProvider>
  </StrictMode>
);
