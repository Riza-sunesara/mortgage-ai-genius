import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import Index from "./pages/Index";
import CalculatorPage from "./pages/CalculatorPage";
import PreQualification from "./pages/PreQualification";
import ApplicationSubmitted from "./pages/ApplicationSubmitted";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/pre-qualification" element={<PreQualification />} />
          <Route path="/submitted" element={<ApplicationSubmitted />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <FloatingChat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
