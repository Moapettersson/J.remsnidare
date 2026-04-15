import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const forceFavicon = () => {
  const faviconHref = `/site-icon.png?v=${Date.now()}`;
  const iconSelectors = [
    "link[rel='icon']",
    "link[rel='shortcut icon']",
    "link[rel='apple-touch-icon']",
  ];

  iconSelectors.forEach((selector) => {
    let link = document.querySelector<HTMLLinkElement>(selector);
    if (!link) {
      link = document.createElement("link");
      link.rel = selector.includes("apple-touch-icon")
        ? "apple-touch-icon"
        : selector.includes("shortcut")
          ? "shortcut icon"
          : "icon";
      document.head.appendChild(link);
    }
    link.href = faviconHref;
    link.type = "image/png";
  });
};

forceFavicon();

createRoot(document.getElementById("root")!).render(<App />);
