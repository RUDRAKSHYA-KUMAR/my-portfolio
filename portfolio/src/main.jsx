import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

/* ── Design System ────────────────────── */
import "./styles/variables.css";
import "./styles/globals.css";

/* ── Section Styles ───────────────────── */
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/philosophy.css";
import "./styles/about.css";
import "./styles/whoami.css";
import "./styles/identities.css";
import "./styles/projects.css";
import "./styles/techstack.css";
import "./styles/contact.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);