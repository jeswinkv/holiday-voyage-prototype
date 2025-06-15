
import Header from "@/components/Header";
import BookingBand from "@/components/BookingBand";
import LoaderOverlay from "@/components/LoaderOverlay";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Wifi, Car, Utensils, Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useBooking } from "@/contexts/BookingContext";

const hotels = [
  {
    id: 1,
    name: "Paradise Resort & Spa",
    location: "North Male Atoll",
    rating: 4.8,
    price: 450,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Airport Transfer", "Restaurant", "Spa"],
    description: "Luxury overwater villas with pristine ocean views"
  },
  {
    id: 2,
    name: "Crystal Waters Hotel",
    location: "South Male Atoll",
    rating: 4.6,
    price: 320,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Pool", "Restaurant", "Beach Access"],
    description: "Beachfront hotel with modern amenities and stunning sunset views"
  },
  {
    id: 3,
    name: "Ocean Breeze Resort",
    location: "Baa Atoll",
    rating: 4.9,
    price: 680,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Private Beach", "Spa", "Water Sports"],
    description: "Exclusive resort in UNESCO Biosphere Reserve"
  },
  {
    id: 4,
    name: "Tropical Paradise Villa",
    location: "Ari Atoll",
    rating: 4.7,
    price: 520,
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Private Pool", "Butler Service", "Snorkeling"],
    description: "Private villas with personal butler and infinity pools"
  },
  {
    id: 5,
    name: "Sunset Beach Resort",
    location: "Lhaviyani Atoll",
    rating: 4.5,
    price: 380,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Beach Bar", "Diving Center", "Yoga Studio"],
    description: "Relaxed beachfront resort perfect for couples and families"
  }
];

const HotelsPage = () => {
  const navigate = useNavigate();
  const { addToTotal, getNumberOfNights } = useBooking();
  const [showLoader, setShowLoader] = useState(true);
  const [sortBy, setSortBy] = useState("recommended");

  const handleSelectHotel = (hotel: typeof hotels[0]) => {
    // Save selected hotel to localStorage
    localStorage.setItem('selectedHotel', JSON.stringify(hotel));
    
    // Calculate total for the stay
    const nights = getNumberOfNights();
    const hotelTotal = hotel.price * nights;
    addToTotal(hotelTotal);
    navigate('/hotel-ancillaries');
  };

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  const getSortedHotels = () => {
    const hotelsCopy = [...hotels];
    
    switch (sortBy) {
      case "low-to-high":
        return hotelsCopy.sort((a, b) => a.price - b.price);
      case "high-to-low":
        return hotelsCopy.sort((a, b) => b.price - a.price);
      case "rating":
        return hotelsCopy.sort((a, b) => b.rating - a.rating);
      case "recommended":
      default:
        return hotelsCopy.sort((a, b) => b.rating - a.rating);
    }
  };

  if (showLoader) {
    return <LoaderOverlay onComplete={handleLoaderComplete} />;
  }

  const sortedHotels = getSortedHotels();
  const nights = getNumberOfNights();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BookingBand />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Choose Your Hotel
              </h1>
              <p className="text-gray-600">
                {hotels.length} hotels found for your stay
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="low-to-high">Price: Low to High</SelectItem>
                  <SelectItem value="high-to-low">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedHotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hotel.location}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {hotel.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600">per night from</div>
                      <div className="text-2xl font-bold text-ocean-700">£{hotel.price}</div>
                      <div className="text-sm text-gray-600">
                        Total for {nights} night{nights > 1 ? 's' : ''}: £{(hotel.price * nights).toLocaleString()}
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleSelectHotel(hotel)}
                      className="bg-ocean-600 hover:bg-ocean-700 text-white px-6 py-2 transition-all duration-300 transform hover:scale-105"
                    >
                      Select Hotel
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

export default HotelsPage;
