import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CustomRouter from "./route";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CustomRouter />
  </StrictMode>
);
