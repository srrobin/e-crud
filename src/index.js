import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./i18n";
import App from "./App";
import "./index.css";
import { ModeProvider } from "./context/ModeProvider";

const queryClient = new QueryClient();
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Suspense fallback={<h1>Loading . . .</h1>}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ModeProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </ModeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </Suspense>

);
