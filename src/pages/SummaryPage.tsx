
import Header from "@/components/Header";
import BookingBand from "@/components/BookingBand";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Smartphone, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SummaryPage = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate('/confirmation');
  };

  const bookingSummary = {
    hotel: {
      name: "Ocean View Resort & Spa",
      nights: 7,
      pricePerNight: 450,
      total: 3150
    },
    hotelAncillaries: [
      { name: "Couples Spa Package", quantity: 1, price: 180 },
      { name: "Sunset Dolphin Cruise", quantity: 2, price: 170 }
    ],
    flight: {
      airline: "Qatar Airways",
      route: "London to Maldives",
      passengers: 3,
      pricePerPerson: 780,
      total: 2340
    },
    flightAncillaries: [
      { name: "Extra Legroom Seat", quantity: 2, price: 170 },
      { name: "Premium Meal Selection", quantity: 3, price: 105 }
    ]
  };

  const calculateTotal = () => {
    const hotelTotal = bookingSummary.hotel.total;
    const hotelAncillariesTotal = bookingSummary.hotelAncillaries.reduce((sum, item) => sum + item.price, 0);
    const flightTotal = bookingSummary.flight.total;
    const flightAncillariesTotal = bookingSummary.flightAncillaries.reduce((sum, item) => sum + item.price, 0);
    
    return hotelTotal + hotelAncillariesTotal + flightTotal + flightAncillariesTotal;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BookingBand totalAmount={`£${calculateTotal()}`} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Booking Summary
              </h1>
              <p className="text-gray-600">
                Review your holiday details before payment
              </p>
            </div>

            {/* Hotel Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Hotel Accommodation</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{bookingSummary.hotel.name}</span>
                    <span className="font-medium">£{bookingSummary.hotel.total}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {bookingSummary.hotel.nights} nights × £{bookingSummary.hotel.pricePerNight} per night
                  </div>
                </div>
                
                {bookingSummary.hotelAncillaries.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    <h4 className="font-medium text-gray-700 mb-2">Hotel Extras</h4>
                    {bookingSummary.hotelAncillaries.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>£{item.price}</span>
                      </div>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Flight Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Flight Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{bookingSummary.flight.airline} - {bookingSummary.flight.route}</span>
                    <span className="font-medium">£{bookingSummary.flight.total}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {bookingSummary.flight.passengers} passengers × £{bookingSummary.flight.pricePerPerson} per person
                  </div>
                </div>
                
                {bookingSummary.flightAncillaries.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    <h4 className="font-medium text-gray-700 mb-2">Flight Extras</h4>
                    {bookingSummary.flightAncillaries.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}</span>
                        <span>£{item.price}</span>
                      </div>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Options</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-ocean-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-ocean-600" />
                      <div>
                        <div className="font-medium">Credit / Debit Card</div>
                        <div className="text-sm text-gray-600">Visa, Mastercard, Amex</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-ocean-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-ocean-600" />
                      <div>
                        <div className="font-medium">Digital Wallet</div>
                        <div className="text-sm text-gray-600">Apple Pay, Google Pay</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-ocean-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-ocean-600" />
                      <div>
                        <div className="font-medium">Bank Transfer</div>
                        <div className="text-sm text-gray-600">Direct bank payment</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Hotel & Extras</span>
                    <span>£{bookingSummary.hotel.total + bookingSummary.hotelAncillaries.reduce((sum, item) => sum + item.price, 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Flights & Extras</span>
                    <span>£{bookingSummary.flight.total + bookingSummary.flightAncillaries.reduce((sum, item) => sum + item.price, 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes & Fees</span>
                    <span>£185</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-ocean-700">£{calculateTotal() + 185}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full bg-ocean-600 hover:bg-ocean-700 text-white py-3 transition-all duration-300 transform hover:scale-105"
                >
                  Pay Now
                </Button>

                <p className="text-xs text-gray-600 text-center mt-4">
                  Your payment is secured with 256-bit SSL encryption
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
