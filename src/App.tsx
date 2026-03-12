import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomCursor from "@/components/CustomCursor";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ForgotPasswordPage from "./pages/ForgotPassword";
import VerifyEmailPage from "./pages/VerifyEmail";
import ResetPasswordPage from "./pages/ResetPassword";
import MenuPage from "./pages/Menu";
import StorePage from "./pages/Store";
import PassportPage from "./pages/Passport";
import OriginsPage from "./pages/Origins";
import BrewPage from "./pages/Brew";
import SeasonalPage from "./pages/Seasonal";
import MasterclassPage from "./pages/Masterclass";
import FindUsPage from "./pages/FindUs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CustomCursor />
      <CartDrawer />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/origins" element={<OriginsPage />} />
          <Route path="/brew" element={<BrewPage />} />
          <Route path="/seasonal" element={<SeasonalPage />} />
          <Route path="/masterclass" element={<MasterclassPage />} />
          <Route path="/find-us" element={<FindUsPage />} />
          <Route path="/passport" element={<PassportPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
