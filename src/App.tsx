import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import CalculatorPage from "./pages/CalculatorPage";
import PreQualification from "./pages/PreQualification";
import ApplicationSubmitted from "./pages/ApplicationSubmitted";
import Dashboard from "./pages/Dashboard";
<<<<<<< HEAD
=======
import AdminDashboard from "./pages/AdminDashboard";
>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/pre-qualification" element={
              <ProtectedRoute><PreQualification /></ProtectedRoute>
            } />
            <Route path="/submitted" element={<ApplicationSubmitted />} />
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
<<<<<<< HEAD
=======
            <Route path="/admin" element={
              <ProtectedRoute><AdminDashboard /></ProtectedRoute>
            } />
>>>>>>> ec57b9a (Added pre-qualification bot and Admin Dashboard logic)
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <FloatingChat />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
