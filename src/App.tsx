import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import Showroom from "./pages/Showroom";
import Shop from "./pages/Shop";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Order from "./pages/Order";  // <-- Lägg till denna import
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/showroom" element={<Showroom />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/kurser" element={<Courses />} />
          <Route path="/om-oss" element={<About />} />
          <Route path="/order" element={<Order />} />  {/* <-- Lägg till denna route */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;