
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { CurrencyProvider } from "./contexts/CurrencyContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CategoryPosts from "./pages/CategoryPosts";
import ArticlePage from "./pages/ArticlePage";
import CryptoCasinos from "./pages/CryptoCasinos";
import LandingPage from "./pages/LandingPage";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <CurrencyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/category/:slug" element={<CategoryPosts />} />
              <Route path="/post/:slug" element={<ArticlePage />} />
              <Route path="/crypto-casinos" element={<CryptoCasinos />} />
              <Route path="/landing/:slug" element={<LandingPage />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CurrencyProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
