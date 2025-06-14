
import Header from "@/components/Header";
import BookingBand from "@/components/BookingBand";
import LoaderOverlay from "@/components/LoaderOverlay";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ancillaries = [
  {
    id: 1,
    name: "Couples Spa Package",
    description: "Relaxing 90-minute couples massage with aromatherapy oils and access to spa facilities",
    price: 180,
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Sunset Dolphin Cruise", 
    description: "3-hour sunset cruise with dolphin watching, champagne, and light refreshments",
    price: 85,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Island Hopping Adventure",
    description: "Full-day excursion visiting 3 pristine islands with snorkeling gear and lunch included",
    price: 120,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Private Beach Dinner",
    description: "Romantic candlelit dinner on the beach with personal chef and waiter service",
    price: 250,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    name: "Scuba Diving Experience",
    description: "Beginner-friendly scuba diving with certified instructor and all equipment provided",
    price: 95,
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];

const HotelAncillariesPage = () => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});
  const [showLoader, setShowLoader] = useState(true);

  const updateQuantity = (id: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change)
    }));
  };

  const getTotalCost = () => {
    return ancillaries.reduce((total, item) => {
      return total + (item.price * (quantities[item.id] || 0));
    }, 0);
  };

  const handleContinue = () => {
    navigate('/flights');
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
      <BookingBand totalAmount={`£${2450 + getTotalCost()}`} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Enhance Your Stay
          </h1>
          <p className="text-gray-600">
            Add unforgettable experiences to your holiday
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {ancillaries.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="text-xl font-bold text-ocean-700 mb-4">
                        £{item.price} per person
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={!quantities[item.id]}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {quantities[item.id] || 0}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {quantities[item.id] > 0 && (
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Total</div>
                          <div className="font-bold text-ocean-700">
                            £{item.price * quantities[item.id]}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-lg">
            {getTotalCost() > 0 && (
              <div>
                <span className="text-gray-600">Ancillaries Total: </span>
                <span className="font-bold text-ocean-700">£{getTotalCost()}</span>
              </div>
            )}
          </div>
          
          <Button
            onClick={handleContinue}
            className="bg-ocean-600 hover:bg-ocean-700 text-white px-8 py-3 transition-all duration-300 transform hover:scale-105"
          >
            Continue to Flights
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HotelAncillariesPage;
