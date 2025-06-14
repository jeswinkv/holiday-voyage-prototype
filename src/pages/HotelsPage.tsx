
import Header from "@/components/Header";
import BookingBand from "@/components/BookingBand";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Wifi, Car, Coffee, Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";

const hotels = [
  {
    id: 1,
    name: "Ocean View Resort & Spa",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    location: "Beachfront, Maldives",
    description: "Luxury resort with overwater villas and world-class spa facilities. Enjoy pristine beaches and crystal-clear waters.",
    price: 450,
    amenities: ["Free WiFi", "Spa", "Pool", "Beach Access", "Restaurant"]
  },
  {
    id: 2,
    name: "Mountain Peak Lodge",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    location: "Alps, Switzerland",
    description: "Cozy mountain lodge with breathtaking alpine views and traditional Swiss hospitality. Perfect for nature lovers.",
    price: 320,
    amenities: ["Free WiFi", "Fireplace", "Mountain Views", "Spa", "Restaurant"]
  },
  {
    id: 3,
    name: "Tropical Paradise Hotel",
    image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    location: "Ubud, Bali",
    description: "Boutique hotel surrounded by lush tropical gardens and rice terraces. Experience authentic Balinese culture.",
    price: 180,
    amenities: ["Free WiFi", "Pool", "Garden", "Yoga Classes", "Restaurant"]
  },
  {
    id: 4,
    name: "Fjord View Hotel",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    location: "Geiranger, Norway",
    description: "Modern hotel with spectacular fjord views and northern lights viewing opportunities. Contemporary Nordic design.",
    price: 280,
    amenities: ["Free WiFi", "Fjord Views", "Aurora Lounge", "Spa", "Restaurant"]
  },
  {
    id: 5,
    name: "Desert Oasis Resort",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    location: "Dubai, UAE",
    description: "Luxury desert resort with traditional architecture and modern amenities. Experience authentic Arabian hospitality.",
    price: 380,
    amenities: ["Free WiFi", "Pool", "Desert Views", "Spa", "Multiple Restaurants"]
  }
];

const HotelsPage = () => {
  const navigate = useNavigate();

  const handleSelectHotel = () => {
    navigate('/hotel-ancillaries');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BookingBand />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Choose Your Perfect Stay
          </h1>
          <p className="text-gray-600">
            {hotels.length} hotels found for your destination
          </p>
        </div>

        <div className="space-y-6">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Hotel Image */}
                  <div className="lg:col-span-1">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-64 lg:h-full object-cover"
                    />
                  </div>

                  {/* Hotel Details */}
                  <div className="lg:col-span-2 p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-800">
                            {hotel.name}
                          </h3>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium text-gray-700">
                              {hotel.rating}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{hotel.location}</span>
                        </div>

                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          {hotel.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {hotel.amenities.map((amenity, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 bg-ocean-50 text-ocean-700 text-xs rounded-full"
                            >
                              {amenity === "Free WiFi" && <Wifi className="w-3 h-3 mr-1" />}
                              {amenity === "Pool" && <Waves className="w-3 h-3 mr-1" />}
                              {amenity === "Restaurant" && <Coffee className="w-3 h-3 mr-1" />}
                              {amenity === "Spa" && <Star className="w-3 h-3 mr-1" />}
                              {amenity === "Beach Access" && <Waves className="w-3 h-3 mr-1" />}
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-sm text-gray-600">per night from</div>
                          <div className="text-2xl font-bold text-ocean-700">
                            £{hotel.price}
                          </div>
                        </div>
                        <Button
                          onClick={handleSelectHotel}
                          className="bg-ocean-600 hover:bg-ocean-700 text-white px-6 py-2 transition-all duration-300 transform hover:scale-105"
                        >
                          Select Hotel
                        </Button>
                      </div>
                    </div>
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
