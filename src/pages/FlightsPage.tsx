import Header from "@/components/Header";
import BookingBand from "@/components/BookingBand";
import LoaderOverlay from "@/components/LoaderOverlay";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const flights = [
  {
    id: 1,
    airline: "British Airways",
    flightNumber: "BA 2019",
    departure: {
      time: "10:30",
      airport: "LHR",
      city: "London"
    },
    arrival: {
      time: "22:45",
      airport: "MLE",
      city: "Maldives"
    },
    duration: "12h 15m",
    stops: "1 stop in Dubai",
    price: 850,
    class: "Economy"
  },
  {
    id: 2,
    airline: "Emirates",
    flightNumber: "EK 649",
    departure: {
      time: "14:20",
      airport: "LHR",
      city: "London"
    },
    arrival: {
      time: "03:35+1",
      airport: "MLE",
      city: "Maldives"
    },
    duration: "11h 15m",
    stops: "1 stop in Dubai",
    price: 920,
    class: "Economy"
  },
  {
    id: 3,
    airline: "Qatar Airways",
    flightNumber: "QR 651",
    departure: {
      time: "08:15",
      airport: "LHR",
      city: "London"
    },
    arrival: {
      time: "21:30",
      airport: "MLE",
      city: "Maldives"
    },
    duration: "11h 15m",
    stops: "1 stop in Doha",
    price: 780,
    class: "Economy"
  },
  {
    id: 4,
    airline: "Turkish Airlines",
    flightNumber: "TK 1986",
    departure: {
      time: "19:45",
      airport: "LHR",
      city: "London"
    },
    arrival: {
      time: "14:20+1",
      airport: "MLE",
      city: "Maldives"
    },
    duration: "16h 35m",
    stops: "1 stop in Istanbul",
    price: 720,
    class: "Economy"
  },
  {
    id: 5,
    airline: "Singapore Airlines",
    flightNumber: "SQ 317",
    departure: {
      time: "11:50",
      airport: "LHR",
      city: "London"
    },
    arrival: {
      time: "18:45+1",
      airport: "MLE",
      city: "Maldives"
    },
    duration: "15h 55m",
    stops: "1 stop in Singapore",
    price: 890,
    class: "Economy"
  }
];

const FlightsPage = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(true);

  const handleSelectFlight = () => {
    navigate('/flight-ancillaries');
  };

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  if (showLoader) {
    return <LoaderOverlay onComplete={handleLoaderComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BookingBand totalAmount="£3,200" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Choose Your Flight
          </h1>
          <p className="text-gray-600">
            {flights.length} flights found for your journey
          </p>
        </div>

        <div className="space-y-4">
          {flights.map((flight) => (
            <Card key={flight.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                  {/* Airline Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center">
                      <Plane className="w-6 h-6 text-ocean-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{flight.airline}</div>
                      <div className="text-sm text-gray-600">{flight.flightNumber}</div>
                      <div className="text-sm text-gray-600">{flight.class}</div>
                    </div>
                  </div>

                  {/* Flight Times */}
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800">{flight.departure.time}</div>
                      <div className="text-sm font-medium text-gray-600">{flight.departure.airport}</div>
                      <div className="text-xs text-gray-500">{flight.departure.city}</div>
                    </div>
                    
                    <div className="flex-1 text-center px-4">
                      <div className="text-sm text-gray-600 mb-1">{flight.duration}</div>
                      <div className="w-full h-px bg-gray-300 relative">
                        <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 bg-gray-50" />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{flight.stops}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-800">{flight.arrival.time}</div>
                      <div className="text-sm font-medium text-gray-600">{flight.arrival.airport}</div>
                      <div className="text-xs text-gray-500">{flight.arrival.city}</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center lg:text-right">
                    <div className="text-sm text-gray-600">per person from</div>
                    <div className="text-2xl font-bold text-ocean-700">£{flight.price}</div>
                  </div>

                  {/* Select Button */}
                  <div className="text-center lg:text-right">
                    <Button
                      onClick={handleSelectFlight}
                      className="bg-ocean-600 hover:bg-ocean-700 text-white px-6 py-2 transition-all duration-300 transform hover:scale-105"
                    >
                      Select Flight
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightsPage;
