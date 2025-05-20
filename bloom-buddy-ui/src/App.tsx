
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import IdentifyPlant from "./pages/IdentifyPlant";
import MyPlants from "./pages/MyPlants";
import PlantDetails from "./pages/PlantDetails";
import Reminders from "./pages/Reminders";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/identify" element={<IdentifyPlant />} />
                <Route path="/my-plants" element={<MyPlants />} />
                <Route path="/plant/:id" element={<PlantDetails />} />
                <Route path="/reminders" element={<Reminders />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
