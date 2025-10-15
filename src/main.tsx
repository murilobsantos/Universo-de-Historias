import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initGA } from "./Analytics";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.css";

console.log("Starting main.tsx script");

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (replaces cacheTime in v5)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

if (typeof window !== "undefined") {
  console.log("Window is defined, initializing GA");
  // --- Inicializa o Google Analytics ---
  initGA();
  // --- Fim GA ---
}

console.log("Rendering React app");

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element with id 'root' not found");
  }
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <DarkModeProvider>
              <ThemeProvider>
                <BrowserRouter
                  future={{
                    v7_relativeSplatPath: true,
                    v7_startTransition: true,
                  }}
                >
                  <App />
                </BrowserRouter>
              </ThemeProvider>
            </DarkModeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
  console.log("React app rendered");
} catch (error) {
  console.error("Error during ReactDOM.render:", error);
}
