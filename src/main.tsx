import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import AppRoot from "./AppRoot.tsx";
import LoadingPage from "./foundation/components/loading/LoadingPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<LoadingPage />}>
      <AppRoot />
    </Suspense>
  </StrictMode>
);
