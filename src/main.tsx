import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// I er router-konfiguration, lägg till:
import Order from "@/pages/Order";

// Och i routes-arrayen:

createRoot(document.getElementById("root")!).render(<App />);
