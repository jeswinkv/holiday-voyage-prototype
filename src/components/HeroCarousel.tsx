
import { useState, useEffect } from "react";

const carouselItems = [
  {
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    title: "Great deals on beach vacations",
    subtitle: "Up to 20% off tropical getaways",
    cta: "Book Now"
  },
  {
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    title: "Mountain adventures await",
    subtitle: "Explore breathtaking hill stations",
    cta: "Discover More"
  },
  {
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    title: "Forest retreats & wellness",
    subtitle: "Reconnect with nature",
    cta: "Find Peace"
  },
  {
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    title: "Riverside escapes",
    subtitle: "Serene waterfront holidays",
    cta: "Explore Now"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {carouselItems.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-overlay" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-2xl mx-auto px-4">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                {item.title}
              </h2>
              <p className="text-xl md:text-2xl mb-8 animate-fade-in">
                {item.subtitle}
              </p>
              <button className="bg-sunset-500 hover:bg-sunset-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 animate-scale-in">
                {item.cta}
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
