import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

const rootElement = document.getElementById("root");
const fallbackElement = document.getElementById("root-fallback");

function removeFallbackWhenReady() {
  if (!fallbackElement || !rootElement) return;
  if (rootElement.childElementCount > 0) {
    fallbackElement.remove();
    return;
  }
  const observer = new MutationObserver(() => {
    if (rootElement.childElementCount > 0) {
      fallbackElement.remove();
      observer.disconnect();
    }
  });
  observer.observe(rootElement, { childList: true });
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

removeFallbackWhenReady();
