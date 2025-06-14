
import Header from "@/components/Header";
import BookingBand from "@/components/BookingBand";
import LoaderOverlay from "@/components/LoaderOverlay";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, MapPin, Wifi, Car, Coffee, Waves } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const hotels = [
  {
    id: 1,
    name: "Azure Lagoon Resort & Spa",
    images: [
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    location: "North Malé Atoll, Maldives",
    description: "An exclusive adults-only resort featuring 120 overwater and beachfront villas with private pools. Each villa offers panoramic ocean views, direct lagoon access, and personalized butler service. The resort boasts a world-class ESPA spa, five dining venues including underwater restaurant Poseidon, and endless water sports activities. Perfect for romantic getaways with sunset dolphin cruises and private beach dining experiences.",
    price: 1200,
    amenities: ["Free WiFi", "Private Pool", "Butler Service", "Spa", "5 Restaurants", "Water Sports"]
  },
  {
    id: 2,
    name: "Coral Paradise Island Resort",
    images: [
      "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    location: "South Malé Atoll, Maldives",
    description: "A family-friendly resort set on a pristine coral island with crystal-clear turquoise waters. Features 200 beach and water villas, each with private terraces and direct beach or lagoon access. The resort offers a kids' club, multiple pools, vibrant coral reef for snorkeling, and authentic Maldivian cultural experiences. Enjoy fresh seafood at the overwater restaurant and unwind at the beachfront spa pavilions.",
    price: 850,
    amenities: ["Free WiFi", "Kids Club", "Snorkeling", "Multiple Pools", "Cultural Center", "Beachfront Spa"]
  },
  {
    id: 3,
    name: "Sunset Cove Luxury Retreat",
    images: [
      "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.7,
    location: "Baa Atoll, Maldives",
    description: "Boutique eco-luxury resort located in UNESCO Biosphere Reserve, offering 85 sustainable villas built with local materials. Each villa features solar panels, rainwater harvesting, and organic gardens. The resort is renowned for manta ray diving, whale shark encounters, and marine conservation programs. Guests enjoy organic cuisine at three restaurants, holistic wellness treatments, and guided nature walks through the island's tropical vegetation.",
    price: 950,
    amenities: ["Eco-Friendly", "Marine Conservation", "Diving Center", "Organic Cuisine", "Wellness Spa", "Nature Walks"]
  },
  {
    id: 4,
    name: "Pearl Island Beach Resort",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.6,
    location: "Ari Atoll, Maldives",
    description: "Contemporary resort featuring 150 modern villas with minimalist design and floor-to-ceiling windows. Each villa includes private infinity pools, outdoor showers, and smart home technology. The resort offers unique experiences like underwater yoga, night fishing with locals, cooking classes with resort chefs, and private sandbank picnics. Three award-winning restaurants serve international cuisine with stunning ocean views.",
    price: 1050,
    amenities: ["Infinity Pools", "Smart Home Tech", "Underwater Yoga", "Cooking Classes", "Private Sandbanks", "Award-winning Dining"]
  },
  {
    id: 5,
    name: "Turquoise Dreams Water Villas",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.8,
    location: "Lhaviyani Atoll, Maldives",
    description: "Adults-only overwater resort with 95 spacious water villas connected by wooden walkways above the lagoon. Each villa features glass floor panels for marine life viewing, private sundeck with hammock, and direct lagoon access via steps. The resort specializes in romantic experiences including floating breakfast service, couples' spa treatments in overwater pavilions, and private yacht excursions to uninhabited islands with personalized beach setups.",
    price: 1350,
    amenities: ["Glass Floor Panels", "Floating Breakfast", "Couples Spa", "Private Yacht", "Hammock Sundeck", "Adults Only"]
  }
];

const HotelsPage = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(true);
  const [sortBy, setSortBy] = useState("recommended");

  const handleSelectHotel = () => {
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
      case "recommended":
      default:
        return hotelsCopy.sort((a, b) => b.rating - a.rating);
    }
  };

  if (showLoader) {
    return <LoaderOverlay onComplete={handleLoaderComplete} />;
  }

  const sortedHotels = getSortedHotels();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BookingBand showTotal={false} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Choose Your Perfect Maldivian Paradise
              </h1>
              <p className="text-gray-600">
                {hotels.length} luxury resorts found in the Maldives
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
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {sortedHotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Hotel Image Carousel */}
                  <div className="lg:col-span-1 relative">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {hotel.images.map((image, index) => (
                          <CarouselItem key={index}>
                            <img
                              src={image}
                              alt={`${hotel.name} - Image ${index + 1}`}
                              className="w-full h-48 lg:h-72 object-cover"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
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
                              {(amenity === "Multiple Pools" || amenity === "Private Pool" || amenity === "Infinity Pools") && <Waves className="w-3 h-3 mr-1" />}
                              {(amenity.includes("Restaurant") || amenity.includes("Dining") || amenity === "Organic Cuisine") && <Coffee className="w-3 h-3 mr-1" />}
                              {(amenity === "Spa" || amenity === "Beachfront Spa" || amenity === "Wellness Spa" || amenity === "Couples Spa") && <Star className="w-3 h-3 mr-1" />}
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
                          Select Resort
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
