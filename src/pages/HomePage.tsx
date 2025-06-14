
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import BookingForm from "@/components/BookingForm";
import { Card, CardContent } from "@/components/ui/card";

const promotionalOffers = [
  {
    city: "Maldives",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Crystal clear waters and overwater bungalows"
  },
  {
    city: "Switzerland",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Alpine adventures and scenic mountain views"
  },
  {
    city: "Bali",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Tropical paradise with rich culture"
  },
  {
    city: "Norway",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Breathtaking fjords and northern lights"
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroCarousel />
      <BookingForm />
      
      {/* Promotional Offers */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Featured Destinations
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotionalOffers.map((offer, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              <div className="relative h-48">
                <img
                  src={offer.image}
                  alt={offer.city}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">Explore {offer.city}</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-600 text-sm">{offer.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer Links */}
      <footer className="bg-ocean-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-playfair">JV Holidays</h3>
              <p className="text-ocean-200">Your perfect vacation awaits with our carefully curated holiday packages.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-ocean-200 hover:text-white transition-colors">FAQ</a>
                <a href="#" className="block text-ocean-200 hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block text-ocean-200 hover:text-white transition-colors">About Us</a>
                <a href="#" className="block text-ocean-200 hover:text-white transition-colors">Terms & Conditions</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-ocean-200 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-ocean-200 hover:text-white transition-colors">Travel Insurance</a>
                <a href="#" className="block text-ocean-200 hover:text-white transition-colors">Booking Help</a>
                <a href="#" className="block text-ocean-200 hover:text-white transition-colors">Travel Guides</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-ocean-200">
                <p>Phone: +44 20 1234 5678</p>
                <p>Email: info@jvholidays.com</p>
                <p>24/7 Customer Support</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-ocean-800 mt-8 pt-8 text-center text-ocean-200">
            <p>&copy; 2024 JV Holidays. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
