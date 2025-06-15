import Header from "@/components/Header";
import BookingBand from "@/components/BookingBand";
import LoaderOverlay from "@/components/LoaderOverlay";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/contexts/BookingContext";

const ancillaries = [
  {
    id: 1,
    name: "Premium Meal Selection",
    description: "Choose from gourmet meals prepared by renowned chefs. Includes vegetarian, vegan, and special dietary options",
    price: 35,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Meals"
  },
  {
    id: 2,
    name: "In-Flight WiFi",
    description: "Stay connected throughout your journey with high-speed internet access",
    price: 15,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Connectivity"
  },
  {
    id: 3,
    name: "Extra Legroom Seat",
    description: "Enjoy additional comfort with seats offering up to 6 inches of extra legroom",
    price: 85,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Seating"
  },
  {
    id: 4,
    name: "Premium Beverage Package",
    description: "Unlimited premium beverages including wine, spirits, and specialty cocktails",
    price: 45,
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Beverages"
  },
  {
    id: 5,
    name: "Priority Boarding",
    description: "Board the aircraft first and settle in without the crowds",
    price: 25,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    category: "Service"
  }
];

const FlightAncillariesPage = () => {
  const navigate = useNavigate();
  const { addToTotal, subtractFromTotal } = useBooking();
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});
  const [showLoader, setShowLoader] = useState(true);

  const updateQuantity = (id: number, change: number) => {
    const currentQty = quantities[id] || 0;
    const newQty = Math.max(0, currentQty + change);
    
    setQuantities(prev => ({
      ...prev,
      [id]: newQty
    }));

    // Update total amount
    const ancillary = ancillaries.find(item => item.id === id);
    if (ancillary) {
      if (change > 0) {
        addToTotal(ancillary.price);
      } else if (change < 0 && currentQty > 0) {
        subtractFromTotal(ancillary.price);
      }
    }
  };

  const getTotalCost = () => {
    return ancillaries.reduce((total, item) => {
      return total + (item.price * (quantities[item.id] || 0));
    }, 0);
  };

  const handleContinue = () => {
    // Save selected flight ancillaries to localStorage
    const selectedAncillaries: {[key: string]: number} = {};
    Object.entries(quantities).forEach(([id, quantity]) => {
      if (quantity > 0) {
        const ancillary = ancillaries.find(item => item.id === parseInt(id));
        if (ancillary) {
          selectedAncillaries[ancillary.name] = quantity;
        }
      }
    });
    localStorage.setItem('selectedFlightAncillaries', JSON.stringify(selectedAncillaries));
    
    navigate('/passenger-details');
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
      <BookingBand />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Enhance Your Flight Experience
          </h1>
          <p className="text-gray-600">
            Add comfort and convenience to your journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {ancillaries.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {item.name}
                    </h3>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mb-2">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="text-xl font-bold text-ocean-700 mb-4">
                  £{item.price} per person
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
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-lg">
            {getTotalCost() > 0 && (
              <div>
                <span className="text-gray-600">Flight Extras Total: </span>
                <span className="font-bold text-ocean-700">£{getTotalCost()}</span>
              </div>
            )}
          </div>
          
          <Button
            onClick={handleContinue}
            className="bg-ocean-600 hover:bg-ocean-700 text-white px-8 py-3 transition-all duration-300 transform hover:scale-105"
          >
            Continue to Passenger Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightAncillariesPage;
