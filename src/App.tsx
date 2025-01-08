import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from "./pages/Index";
import { DeveloperSignup } from './pages/DeveloperSignup';
import RecruiterSignup from "./pages/RecruiterSignup";
import SignIn from "./pages/signin";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signup/candidate" element={<DeveloperSignup />} />
              <Route path="/signup/recruiter" element={<RecruiterSignup />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </AuthProvider>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
