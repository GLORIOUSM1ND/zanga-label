import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Index from "./pages/index";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/SplashScreen";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* === SPLASH SCREEN === */}
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}

        {/* === MAIN APP (Always rendered, hidden via CSS) === */}
        <main
          className={`main-container ${showSplash ? '' : 'ready'}`}
          style={{ display: showSplash ? 'none' : 'block' }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </main>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;