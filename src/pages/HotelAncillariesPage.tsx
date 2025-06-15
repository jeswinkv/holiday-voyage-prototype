
import Header from "@/components/Header";
import BookingBand from "@/components/BookingBand";
import LoaderOverlay from "@/components/LoaderOverlay";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/contexts/BookingContext";

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
  const { addToTotal, subtractFromTotal, setTotal, getNumberOfNights, bookingState } = useBooking();
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const initializePage = async () => {
      try {
        console.log('HotelAncillariesPage: Starting initialization...');
        console.log('BookingState:', bookingState);
        
        let calculatedTotal = 0;
        
        // Safely get saved data from localStorage
        const savedHotel = localStorage.getItem('selectedHotel');
        const savedFlight = localStorage.getItem('selectedFlight');
        
        console.log('SavedHotel:', savedHotel);
        console.log('SavedFlight:', savedFlight);
        
        // Add hotel cost with safe parsing
        if (savedHotel && savedHotel !== 'null') {
          try {
            const hotelData = JSON.parse(savedHotel);
            console.log('Parsed hotel data:', hotelData);
            
            // Safe number of nights calculation
            let nights = 7; // default
            try {
              nights = getNumberOfNights();
            } catch (e) {
              console.warn('Error getting number of nights, using default:', e);
            }
            
            console.log('Number of nights:', nights);
            const hotelPrice = Number(hotelData.price || hotelData.pricePerNight || 0);
            const hotelTotal = hotelPrice * nights;
            calculatedTotal += hotelTotal;
            console.log('Hotel total:', hotelTotal);
          } catch (e) {
            console.error('Error parsing hotel data:', e);
          }
        }
        
        // Add flight cost with safe parsing
        if (savedFlight && savedFlight !== 'null') {
          try {
            const flightData = JSON.parse(savedFlight);
            console.log('Parsed flight data:', flightData);
            
            // Safe passenger calculation with fallbacks
            const adultsNum = parseInt(String(bookingState?.adults || '2')) || 2;
            const childrenNum = parseInt(String(bookingState?.children || '0')) || 0;
            const infantsNum = parseInt(String(bookingState?.infants || '0')) || 0;
            const passengers = adultsNum + childrenNum + infantsNum;
            
            console.log('Number of passengers:', passengers);
            const flightPrice = Number(flightData.price || flightData.pricePerPerson || 0);
            const flightTotal = flightPrice * passengers;
            calculatedTotal += flightTotal;
            console.log('Flight total:', flightTotal);
          } catch (e) {
            console.error('Error parsing flight data:', e);
          }
        }
        
        console.log('Final calculated total:', calculatedTotal);
        
        // Safe total setting
        try {
          setTotal(calculatedTotal);
        } catch (e) {
          console.error('Error setting total:', e);
        }
        
        console.log('HotelAncillariesPage: Initialization complete');
        
      } catch (error) {
        console.error('Error in HotelAncillariesPage initialization:', error);
      }
    };

    initializePage();
  }, [setTotal, getNumberOfNights, bookingState]);

  const updateQuantity = (id: number, change: number) => {
    try {
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
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const getTotalCost = () => {
    try {
      return ancillaries.reduce((total, item) => {
        return total + (item.price * (quantities[item.id] || 0));
      }, 0);
    } catch (error) {
      console.error('Error calculating total cost:', error);
      return 0;
    }
  };

  const handleContinue = () => {
    try {
      // Save selected hotel ancillaries to localStorage
      const selectedAncillaries: {[key: string]: number} = {};
      Object.entries(quantities).forEach(([id, quantity]) => {
        if (quantity > 0) {
          const ancillary = ancillaries.find(item => item.id === parseInt(id));
          if (ancillary) {
            selectedAncillaries[ancillary.name] = quantity;
          }
        }
      });
      localStorage.setItem('selectedHotelAncillaries', JSON.stringify(selectedAncillaries));
      
      // Check if we're in editing mode
      const isEditingHotel = localStorage.getItem('editingHotel');
      if (isEditingHotel) {
        // Clear the editing flag and go back to summary
        localStorage.removeItem('editingHotel');
        navigate('/summary');
      } else {
        // Normal flow - continue to flights
        navigate('/flights');
      }
    } catch (error) {
      console.error('Error in handleContinue:', error);
      // Continue anyway
      navigate('/flights');
    }
  };

  const handleLoaderComplete = () => {
    try {
      console.log('Loader complete, hiding loader...');
      setShowLoader(false);
    } catch (error) {
      console.error('Error in handleLoaderComplete:', error);
      setShowLoader(false); // Hide loader anyway
    }
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
