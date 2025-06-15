
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "@/contexts/BookingContext";
import HomePage from "./pages/HomePage";
import HotelsPage from "./pages/HotelsPage";
import HotelAncillariesPage from "./pages/HotelAncillariesPage";
import FlightsPage from "./pages/FlightsPage";
import FlightAncillariesPage from "./pages/FlightAncillariesPage";
import PassengerDetailsPage from "./pages/PassengerDetailsPage";
import SummaryPage from "./pages/SummaryPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BookingProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/hotel-ancillaries" element={<HotelAncillariesPage />} />
            <Route path="/flights" element={<FlightsPage />} />
            <Route path="/flight-ancillaries" element={<FlightAncillariesPage />} />
            <Route path="/passenger-details" element={<PassengerDetailsPage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
